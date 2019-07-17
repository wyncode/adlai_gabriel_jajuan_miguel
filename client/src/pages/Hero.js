import React from 'react'
import axios from 'axios'
import '../index.css'
import SelectedHeroes from './SelectedHero'

class Hero extends React.Component {
  state = {
    hero: [],
    loading: true,
    selectedHeroes: [],

  }

  componentDidMount(){

    axios.get(`/hero/${this.props.match.params.id}`)
      .then(response => this.setState({ hero :response.data,
                                        loading: false,
                                        selectedHeroes: response.data }
                                        , () => this.setStorage() )
    )
  }

  setStorage = () => {
      localStorage.setItem('hero', this.state.selectedHeroes )
      let hero = localStorage.getItem('hero')
      localStorage.setItem("hero", JSON.stringify(this.state.selectedHeroes))
      console.log(hero);
  }

  render(){
    const { hero, loading } = this.state
    let aliases = []
    if (hero.biography) aliases = hero.biography.aliases.filter(alias => alias !== "-")
    return(
      loading ? <h1>Loading</h1> :
      <div className="heroCard">
        <div className="background2">
          <div className="profile-card">
            <img height="350px" width= "100%" alt={hero.name} src={ hero.image && hero.image.url }></img>
            <div className="profile-bio">
              <h1>Hero Info</h1>
              <h3>↓</h3>
              <div>
                <h3>Name:</h3>
                {hero.name}
              </div>
              <div>
                <h3>Publisher:</h3>
                {hero.biography && hero.biography.publisher}
              </div>
              <div>
                <h3>Full Name</h3>
                {hero.biography && hero.biography["full-name"]}
              </div>
              <div>
                <h3>Born:</h3>
                {hero.biography && hero.biography["place-of-birth"]}
              </div>
              <div>
                { aliases.length && <h3>Alias:</h3> }
                { hero.biography && hero.biography.aliases.map(alias => <div key={alias}>{alias}</div> ) }
              </div>
            </div>
          </div>
          <div className="powers">
            <h1>Power Levels</h1>
            <div className="powerLevels">
              <div>Combat: {hero.powerstats && hero.powerstats.combat}</div>
              <div>Durability: {hero.powerstats && hero.powerstats.durability}</div>
              <div>Intelligence: {hero.powerstats && hero.powerstats.intelligence}</div>
              <div>Power: {hero.powerstats && hero.powerstats.power}</div>
              <div>Speed: {hero.powerstats && hero.powerstats.speed}</div>
              <div>Strength: {hero.powerstats && hero.powerstats.strength}</div>
            </div>
            <SelectedHeroes hero={this.state.selectedHeroes}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero

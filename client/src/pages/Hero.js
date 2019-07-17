import React from 'react'
import axios from 'axios'
import '../index.css'

class Hero extends React.Component {
  state = {
    hero: {},
    loading: true,
  }

  componentDidMount(){
    axios.get(`/hero/${this.props.match.params.id}`)
      .then(response => this.setState({ hero :response.data, loading: false}))
  }

  render(){
    let background = 'https://wallpapercave.com/wp/wp2757832.gif'
    const { hero, loading } = this.state
    let aliases = []
    if (hero.biography) aliases = hero.biography.aliases.filter(alias => alias !== "-")
    return(
      loading ? <div className="spinnerHolder" ><div class="lds-hourglass"></div></div> :
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
        </div>
        <div className="powers" style={{backgroundImage: `url(${background})`}}>
          <div className="big-box">
            <div className="tittle">
              <h1>{hero.name} <br></br>Power Levels</h1>
            </div>
            <div className="powerLevels">
              <div className="left">
                <div> <h2>Combat: {hero.powerstats && hero.powerstats.combat}</h2></div>
                <div><h2>Durability: {hero.powerstats && hero.powerstats.durability}</h2></div>
                <div><h2>Intelligence: {hero.powerstats && hero.powerstats.intelligence}</h2></div>
              </div>
              <div className="right">
                <div><h2>Power: {hero.powerstats && hero.powerstats.power}</h2></div>
                <div><h2>Speed: {hero.powerstats && hero.powerstats.speed}</h2></div>
                <div><h2>Strength: {hero.powerstats && hero.powerstats.strength}</h2></div>
              </div>
            </div>
          </div>
        </div>
        <div className="txs0" >
          <div className="txs1">
            <h1 className="txstittle">Thank you!</h1>
          </div>
          <div className="txs2">
            <div className="gifright"></div>
          </div>
          <div className="txs3">
            <h3 className="txstittle">Work created with love, passion, tears and many hours on google.</h3><br></br><h3>From Group 2: Adlai, Gabriel, Jajuan, Miguel.</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero

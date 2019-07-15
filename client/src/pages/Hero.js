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
    const { hero, loading } = this.state
    let aliases = []
    if (hero.biography) aliases = hero.biography.aliases.filter(alias => alias !== "-")
    return(
      loading ? <h1>Loading</h1> :
      <div className="heroCard">
      <h1>{ hero.biography && hero.biography.publisher}</h1>
      {
        //**************************IMAGE IS HERE*************************************************************
      }
          <img height="200px" alt={hero.name} src={ hero.image && hero.image.url }></img>

          {
            //**********************Hero Info IS HERE****************************************************
          }
          <h1>Hero Info</h1>
        <div className="heroInfo">
          <div>{hero.name}</div>
          <div>{hero.biography && hero.biography["full-name"]}</div>
          <div>Born: {hero.biography && hero.biography["place-of-birth"]}</div>
          {
            aliases.length && <h1>Alias</h1>
          }
          { aliases.map(alias => <div key={alias}>{alias}</div>) }
        </div>
        {
          //*************************Power Levels ARE HERE*******************************************************
        }
        <h1>Power Levels</h1>
        <div className="powerLevels">
          <div>Combat: {hero.powerstats && hero.powerstats.combat}</div>
          <div>Durability: {hero.powerstats && hero.powerstats.durability}</div>
          <div>Intelligence: {hero.powerstats && hero.powerstats.intelligence}</div>
          <div>Power: {hero.powerstats && hero.powerstats.power}</div>
          <div>Speed: {hero.powerstats && hero.powerstats.speed}</div>
          <div>Strength: {hero.powerstats && hero.powerstats.strength}</div>
        </div>
      </div>
    )
  }
}

export default Hero

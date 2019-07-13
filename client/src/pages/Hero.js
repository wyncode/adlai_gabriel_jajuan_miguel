import React from 'react'
import axios from 'axios'
import '../index.css'

class Hero extends React.Component {
  state = { hero: {} }

  componentDidMount(){
    console.log("I'm Working");
    axios.get(`${this.props.match.params.id}`)
      .then(response => this.setState({ hero :response.data}))
      console.log("We've got data",this.state.hero);
  }

  render(){
    const { hero } = this.state
    console.log(hero)
    return(
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
          <h1>Alias</h1>
            { hero.biography && hero.biography.aliases.map((alias, index) => alias === ["-"] ? null : <div key={index}>{alias}</div> )
            }
        </div>
        {
          //*************************Power Levels ARE HERE*******************************************************
        }
        <h1>Power Levels</h1>
        <div className="powerLevels">
          <div>Combat: {this.state.hero.powerstats && this.state.hero.powerstats.combat}</div>
          <div>Durability: {this.state.hero.powerstats && this.state.hero.powerstats.durability}</div>
          <div>Intelligence: {this.state.hero.powerstats && this.state.hero.powerstats.intelligence}</div>
          <div>Power: {this.state.hero.powerstats && this.state.hero.powerstats.power}</div>
          <div>Speed: {this.state.hero.powerstats && this.state.hero.powerstats.speed}</div>
          <div>Strength: {this.state.hero.powerstats && this.state.hero.powerstats.strength}</div>
        </div>
      </div>
    )
  }
}

export default Hero

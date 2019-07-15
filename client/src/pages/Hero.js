import React from 'react'
import axios from 'axios'
import '../index.css'
import { Bar } from 'react-chartjs-2'

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
    console.log(hero)
    let aliases = []
    if (hero.biography) aliases = hero.biography.aliases.filter(alias => alias !== "-")
    let powerstats = {}
    let chartData = {labels: [], datasets: [{}]}
    if (hero.powerstats) {
      let labels = Object.keys(hero.powerstats).filter(key => !Array.isArray(hero.powerstats[key]))
      chartData.labels = labels
      chartData.datasets[0].data = labels.map(label => Number(hero.powerstats[label]))
    }
    return(
      loading ? <h1>Loading</h1> :
      <div className="heroCard">
        
  <div className="background2">
      <div className="profile-card">
            <img height="350px" width= "100%" alt={hero.name} src={ hero.image && hero.image.url }></img>
              
              <div className="profile-bio">
                <h1> Hero Info </h1> 
                <h3>↓</h3>
                <h3>Name:</h3>
                <div>{hero.name}</div>
                <h3>Publisher:</h3>
                <div>{hero.biography && hero.biography.publisher}</div>
                <div>{hero.biography && hero.biography["full-name"]}</div>
                <div><h3>Born:</h3> 
                {hero.biography && hero.biography["place-of-birth"]}</div>
                <h3>Alias:</h3>
                  { hero.biography && hero.biography.aliases.map((alias, index) => alias === ["-"] ? null : <div key={index}>{alias}</div> )
                  }
              </div>
       </div>
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

        <Bar data={chartData}/>
      </div>
    )
  }
}

export default Hero

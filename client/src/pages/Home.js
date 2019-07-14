import React from 'react'
import axios from 'axios'
import encode from 'encodeurl'
import { Link } from 'react-router-dom'
import '../index.css'


const getRandomIndex = () => Math.floor(Math.random() * Math.floor(700))
const getRandomHeroUrl = () => `hero/${getRandomIndex()}`

class Heroes extends React.Component {

  state = {
    superHeros: [],
    randomHeros: [],
    findHero: '',
    errorMessage: 'That hero does not exist try again!',
    loading: true,
  }
  componentDidMount(){
    this.getRandomHeroes()
  }

  handleChange = (event) => {
    event.preventDefault()
    if (this.state.findHero.includes('spider ')) {
      this.state.findHero.split(' ').join('-')
    }else if (this.state.findHero ==='') {
      this.setState({errorMessage: "You forgot to type in a hero's name"})
    }else {
      this.state.findHero.split(' ').join('%20')
    }

    this.setState({findHero: event.target.value})
    let url = encode(`/superhero/${this.state.findHero.toLowerCase()}`)
    axios.get(url)
    .then(response => response && this.setState({ superHeros: response.data }))
}
    getRandomHeroes = async () => {
      const requests = []
      for (let i = 0; i < 3; i++) requests.push(axios.get(getRandomHeroUrl()))
      const responses = await Promise.all(requests)
      const randomHeros = responses.map(response => response.data)
      this.setState({ randomHeros })
    }

    render(){
      return(
        <div className="homePage">
          <h1>Hero Data Base</h1>
            <input type="search" value={this.state.findHero} onChange={this.handleChange}  />

            <div>
              {this.state.superHeros ?  <h1>{this.state.errorMessage}</h1>
                : this.state.superHeros.map( (hero, index) => {
                  return (

                    <Link key={hero.id} to={`/hero/${hero.id}`}>
                      <div >
                        <h1>{hero.name}</h1>
                        <img className='searchPics' height="100px" src={hero.image.url} alt={hero.name}></img>
                      </div>
                    </Link>
                  )
                })
              }
              </div>
              <hr></hr>
              <div className="featuredPics">
              <h1>Featured</h1>
              {
                !!this.state.randomHeros.length && this.state.randomHeros.map( (hero, index) => {
                  return (

                    <Link key={hero.id} to={`/hero/${hero.id}`}>
                      <div >
                        <h1>{hero.name}</h1>
                        <img className="featuredPic" src={hero.image && hero.image.url} alt={hero.name}></img>
                      </div>
                    </Link>
                  )
                })
              }
              </div>

        </div>

    )
  }
}


export default Heroes;

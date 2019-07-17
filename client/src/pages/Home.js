import React from 'react'
import axios from 'axios'
import encode from 'encodeurl'
import { Link } from 'react-router-dom'
import '../index.css'
import { debounce } from '../utils';


const getRandomIndex = () => Math.floor(Math.random() * Math.floor(700))
const getRandomHeroUrl = () => `hero/${getRandomIndex()}`

class Heroes extends React.Component {

  state = {
    superHeros: [],
    randomHeros: [],
    findHero: '',
    errorMessage: 'That hero does not exist try again!',
    loading: true,
    searchFeatureDisappear: false,
  }
  componentDidMount(){
    this.getRandomHeroes()
  }

  debouncedFetch = debounce(() => {
    console.log('calling this')
    this.handleFeature()
    let url = encode(`/superhero/${this.state.findHero.toLowerCase()}`)
    axios.get(url)
    .then(response => response && this.setState({ superHeros: response.data }))
  }, 500)

  handleFeature = event => {
    this.setState({searchFeatureDisappear: true})
  }

  handleChange = (event) => {
    if (this.state.findHero.includes('spider ')) {
      this.state.findHero.split(' ').join('-')
    }else if (this.state.findHero ==='') {
      this.setState({errorMessage: "You forgot to type in a hero's name"})
    }else {
      this.state.findHero.split(' ').join('%20')
    }
    this.setState({findHero: event.target.value}, () => this.debouncedFetch())
  }

  getRandomHeroes = async () => {
    const requests = []
    for (let i = 0; i < 3; i++) requests.push(axios.get(getRandomHeroUrl()))
    const responses = await Promise.all(requests)
    const randomHeros = responses.map(response => response.data)
    this.setState({ randomHeros })
  }

  render(){
    console.log('super heroes', this.state.superHeros, this.state.superHeros.length);
    return(
      <div className="top">
        <div className="homePage">
          <div className="container2">
            <div><h1 id="hometitle">Hero Data Base</h1></div>
          </div>
          <div className="wrapper">
            <div className="searchContainer">
              {
                this.state.superHeros.map( (hero, index) => {
                  return (
                    <Link key={hero.id} to={`/hero/${hero.id}`}>
                      <div>
                        <h1>{hero.name}</h1>
                        <img className='searchPics' height="100px" src={hero.image.url} alt={hero.name}></img>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div className={this.state.searchFeatureDisappear ? "disappear" : "featuredPics"}>
            {
              this.state.randomHeros.map( (hero, index) => {
                return (
                  <Link key={hero.id} to={`/hero/${hero.id}`}>
                    <div className="featuredContainer">
                      <h1>{hero.name}</h1>
                      <img className="featuredPic" src={hero.image && hero.image.url} alt={hero.name}></img>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className="container">
          <input
            type="text"
            value={this.state.findHero}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <div className="search"></div>
        </div>
      </div>
    )
  }
}


export default Heroes;

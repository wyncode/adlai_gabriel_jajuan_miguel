import React from 'react'
import axios from 'axios'
import encode from 'encodeurl'
import { Link } from 'react-router-dom'

class Heroes extends React.Component {

  state = {
    superHeros: [],
    findHero: '',
    errorMessage: 'That hero does not exist try again!',
  }

  handleChange = (event) => {
    event.preventDefault()
    if (this.state.findHero.includes('spider ')) {
      console.log("running spider");
      this.state.findHero.split(' ').join('-')
      console.log(this.state.findHero)
    }else if (this.state.findHero ==='') {
      this.setState({errorMessage: "You forgot to type in a hero's name"})
    }else {
      this.state.findHero.split(' ').join('%20')
      console.log(this.state.findHero);
    }

    this.setState({findHero: event.target.value})
    let url = encode(`/superhero/${this.state.findHero.toLowerCase()}`)
    axios.get(url)
    .then( response => {
      if (response === '') {
        console.log('string is here');
      }else {
        console.log('Say Something',response.data);
        this.setState({ superHeros: response.data })
    }
  })
}

    render(){
      console.log('state',this.state);
      return(
        <div>
          <h1>Hero Data Base</h1>
            <input type="search" value={this.state.findHero} onChange={this.handleChange}  />


              {this.state.superHeros === "" ?  <h1>{this.state.errorMessage}</h1>
                : this.state.superHeros.map( (hero, index) => {
                  console.log(hero.name)
                  return (

                    <Link key={hero.id} to={`/hero/${hero.id}`}>
                      <div >
                        <h1>{hero.name}</h1>
                        <img src={hero.image.url} alt={hero.name}></img>
                      </div>
                    </Link>
                  )
                })
              }
        </div>

    )
  }
}


export default Heroes;

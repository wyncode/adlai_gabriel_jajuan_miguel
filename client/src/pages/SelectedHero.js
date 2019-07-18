import React from 'react'
import { Link } from 'react-router-dom'


const container = {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gridGap: '10px',
  backgroundColor: 'white',
  textAlign: 'center',
  borderRadius: '10px',

}
const characterContainer = {
  display: 'grid',
  gridGap: '10px',
  backgroundColor: '#151515',
  textAlign: 'center',
  padding: '40px',
  color: 'red',
  textDecoration: 'none',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr) )',
}
const title = {
  color: 'red',
  textDecoration: 'none',
}
const pics = {
  height: '200px',
  width: '150px',
  borderRadius: '10%',
  margin: '10px',
  boxShadow: '0 0 4px 0 lightgray',
  transition: 'all .2s ease-in-out',
}

let heros
const SelectedHeroes = () => {
  let retrievedHeros = localStorage.getItem("hero")
  console.log(retrievedHeros);
  heros = JSON.parse(retrievedHeros)
  console.log('New list of heroes',heros)
  return (
    <>
    <div style={container}>
      <div>
      <h1 style={title}>Superhero List</h1>
        {
          heros.map( hero => {
            console.log(hero.image);
            return(
              <Link key={hero.id} to={`/hero/${hero.id}`}>
                <div >
                  <h1 style={{color: "black"}}>{hero.name}</h1>
                </div>
              </Link>
            )
          })
        }
      </div>
      <div style={characterContainer}>
        {
          heros.map( hero => {
            console.log(hero.image);
            return(
              <Link key={hero.id} to={`/hero/${hero.id}`}>
                <div >
                  <h1 style={{color: "lightgray"}}>{hero.name}</h1>
                  <img style={pics} height="100px" src={hero.image.url} alt={hero.name} />
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
    </>
  )
}

export default SelectedHeroes;

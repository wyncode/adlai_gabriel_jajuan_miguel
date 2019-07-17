import React from 'react'

let heros
const SelectedHeroes = () => {
  let retrievedHeros = localStorage.getItem("hero")
  console.log(retrievedHeros);
  heros = JSON.parse(retrievedHeros)
  console.log('New list of heroes',heros)
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default SelectedHeroes;

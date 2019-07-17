import React from 'react'

let heros
const SelectedHeroes = () => {
  let retrievedHeros = JSON.parse(localStorage.getItem("hero")) || []
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default SelectedHeroes;

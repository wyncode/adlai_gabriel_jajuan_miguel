if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios')


app.get('/superhero/:hero', (request,response)=> {
  console.log('hit');
  axios.get(`https://superheroapi.com/api/${process.env.SUPER_HERO_KEY}/search/${request.params.hero}`)
  .then(superHero => response.json(superHero.data.results) || [])
  .catch( error => response.json({error: "There are no Heroes with that name try again"}))
})

app.get('/hero/:id', (request,response)=> {
  console.log('hey buddy');
  axios.get(`https://superheroapi.com/api/${process.env.SUPER_HERO_KEY}/${request.params.id}`)
  .then(hero => response.json(hero.data) || [])
  .catch(error => console.log("error", error))
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(process.env.PORT || 8080)

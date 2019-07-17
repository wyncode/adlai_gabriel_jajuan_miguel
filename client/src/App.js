import React from 'react';
import Home from  './pages/Home'
import Hero from  './pages/Hero'
import SelectedHero from  './pages/SelectedHero'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './pages/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/yourheroes' component={SelectedHero}/>
        <Route exact path='/hero/:id' component={Hero}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

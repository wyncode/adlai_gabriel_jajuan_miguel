import React from 'react';
import Home from  './pages/Home'
import Hero from  './pages/Hero'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/hero/:id' component={Hero}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

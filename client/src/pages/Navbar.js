import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
  <nav>
    <ul>
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink exact to="/">Heros</NavLink></li>
      <li><NavLink exact to="/">About Us</NavLink></li>
      <li><NavLink exact to="/">Details</NavLink></li>
    </ul>
  </nav>
)

export default Navbar
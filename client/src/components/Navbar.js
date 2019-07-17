import React from 'react'
import { NavLink } from 'react-router-dom'
import '../index.css'


const Navbar = () => (
  <>
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
      </ul>
    </nav>
    <section className="seperator-wrapper">
      <div className="seperator gradient">
      </div>
    </section>
  </>
)

export default Navbar

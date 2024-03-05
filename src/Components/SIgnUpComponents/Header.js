import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className='header'>
        <div className='gradient'></div>
      <NavLink to="/">Signup</NavLink>
      <NavLink to="/Podcasts">Podcasts</NavLink>
      <NavLink to="/CreateAPodcast">Start A Podcast</NavLink>
      <NavLink to="/Profile">Profle</NavLink>
    </nav>
  )
}

export default Header
import React from 'react'
import { NavLink } from 'react-router-dom'

function Header({user}) {
  return (
    <header style={{display: "flex", justifyContent: "space-between",padding: "20px"}}>
      <h2>Weather App</h2>
      <nav style={{display: "flex", gap: "10px",alignItems: "center"}}>
        <NavLink to={'/'} style={{textDecoration: "none"}}>Home</NavLink>
        <p>{user}</p>
      </nav>
    </header>
  )
}

export default Header

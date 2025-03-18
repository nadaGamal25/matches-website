import React from 'react'
import logo from "../../assets/logo.png"

export default function Navbar() {
  return (
    <>
    {/* Navbar */}
    <nav className="navbar">
        <div className="logo ">
          <img className='main-logo' src={logo} alt="Logo"/>Top Matches</div>
        <button className="btn btn-outline-warning fw-bold me-3">Logout</button>
      </nav>
    </>
  )
}

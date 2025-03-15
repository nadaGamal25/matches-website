import React from 'react'
import logo from "../../assets/logo.png"

export default function Login() {
  return (
    <>
     {/* <div className="login-container">
      <div className="login-card">
        <h2 className="text-center">Welcome !</h2>
        <p className="text-center">Your Gateway to Live & Recorded Matches!</p>
        <form>
          <div className="input-group">
            <input type="email" className="form-control" placeholder="Email" required />
            <span className="input-icon">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          <div className="input-group">
            <input type="password" className="form-control" placeholder="Password" required />
            <span className="input-icon">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Forget your password?
        </p>
      </div>
    </div> */}

{/* <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome !</h2>
        <p className="tagline">Your Gateway to Live & Recorded Matches!</p>
        <form className="login-form">
          <input type="email" className='my-1' placeholder="Enter Email" required />
          <input type="password" className='my-1' placeholder="Enter Password" required />
          <button type="submit" className="login-btn my-3">Login</button>
          <p className="signup-link">Don't have an account? <a href="#">Sign Up</a></p>
        </form>
      </div>
    </div> */}
    <div className="login-page-main">
<div>
    <img className='main-logo m-1' src={logo} />
  </div>
<div className="login-page">
      <div className="login-container">
        <h2 className="login-title fw-bold">Welcome !</h2>
        <p className="tagline">Your Gateway to Live & Recorded Matches!</p>
        <form className="login-form">
        <div className="input-group">
            <input type="email" className="form-control" placeholder="Email" required />
            <span className="input-icon">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          <div className="input-group">
            <input type="password" className="form-control" placeholder="Password" required />
            <span className="input-icon">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          <button type="submit" className="login-btn my-3">Login</button>
          <a href='#' className="text-white">Forget your password ?</a>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}

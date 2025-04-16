import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {
  let navigate= useNavigate(); //hoke
  const [errorList, seterrorList]= useState([]); 
  const [theUser,setUser] =useState({
    username:'',
    password:''
  })
  const [visible , setVisible] =useState(false);
  const [error , setError]= useState(null)
  const [isLoading, setisLoading] =useState(false)

  async function sendLoginDataToApi(){
    try {
      const {data} = await axios.post(`https://zad.onrender.com/user/log-in`, theUser);
        navigate('/home');
        localStorage.setItem('userToken', data.token);
        
        console.log(data.token);
        setisLoading(false);
         saveUserData();
      
    } catch (error) {
      setisLoading(true)
      console.log(error);
      setError('Invalid username number or password');
      // window.alert('wrong password or email');
    }
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setisLoading(true);
    let validation = validateLoginForm();
    console.log(validation);
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    } else {
        sendLoginDataToApi();
    }
  }

function getUserData(e){
let myUser={...theUser};
myUser[e.target.name]= e.target.value;
setUser(myUser);
console.log(myUser);
}

function validateLoginForm(){
let scheme= Joi.object({
username:Joi.string().required(),
password:Joi.string().required()

});
return scheme.validate(theUser, {abortEarly:false});
}
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
        <form onSubmit={submitLoginForm} className="login-form">
        <div className="input-group">
            <input type="text" className="form-control" placeholder="username" name='username' onChange={getUserData} required />
            <span className="input-icon">
              <i className="fas fa-user"></i>
            </span>
            {/* {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">username is not correct</div>
      }
    })} */}
          </div>
          <div className="input-group pass-box">
          {/* <div className='pass-box'> */}
      <input  type={visible? "text" :"password"} className='form-control pass' name='password'
       onChange={getUserData} placeholder="Password" required/>
      <span className="input-icon">
              <i className="fas fa-lock"></i>
            </span>
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {/* {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">password is not correct</div>
      }
    })} */}
          </div>
          {error ? <p className='text-danger'>{error}</p>:null}
          <button type="submit" className="login-btn my-3">
          {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'Login'}
          </button>
          {/* <a href='#' className="text-white">Forget your password ?</a> */}
        </form>
      </div>
    </div>
    </div>
    </>
  )
}

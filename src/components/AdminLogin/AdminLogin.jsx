import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({saveAdminData}) {
    let navigate= useNavigate(); //hoke
    const [errorList, seterrorList]= useState([]); 
    const [theUser,setUser] =useState({
      email:'',
      password:''
    })
    const [visible , setVisible] =useState(false);
    const [error , setError]= useState(null)
    const [isLoading, setisLoading] =useState(false)
  
    async function sendLoginDataToApi(){
      try {
        const {data} = await axios.post(`http://localhost:3000/admin/login`, theUser);
          navigate('/createUser');
          localStorage.setItem('adminToken', data.token);
          
          console.log(data.token);
          setisLoading(false);
          saveAdminData();
        
      } catch (error) {
        setisLoading(true)
        console.log(error);
        setError('Invalid email or password');
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
  email:Joi.string().required(),
  password:Joi.string().required()
  
  });
  return scheme.validate(theUser, {abortEarly:false});
  }
    return (
      <>
      <div className="login-page-main">
  <div>
      <img className='main-logo m-1' src={logo} />
    </div>
  <div className="login-page">
        <div className="login-container">
          <h2 className="login-title fw-bold pb-3">Welcome !</h2>
          <form onSubmit={submitLoginForm} className="login-form">
          <div className="input-group">
              <input type="text" className="form-control" placeholder="email" name='email' onChange={getUserData} required />
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
              
            </div>
            <div className="input-group pass-box">
        <input  type={visible? "text" :"password"} className='form-control pass' name='password'
         onChange={getUserData} placeholder="Password" required/>
        <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
        <span onClick={()=> setVisible(!visible)} className="seenpass">
        {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
        </span>
        
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
  
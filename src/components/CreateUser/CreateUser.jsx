import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Joi from 'joi';

export default function CreateUser() {
    const [user,setUser] =useState({
        name:'',
        phone:'',
        email:'',
        password:'',
        durationInDays:'',
       
      })
      const [error , setError]= useState('')
      const [isLoading, setisLoading] =useState(false)
      const [errorList, seterrorList]= useState([]); 
      const [visible, setVisible]= useState(false); 
    
      async function sendRegisterDataToApi(){
        try {
            let response= await axios.post(`https://zad.onrender.com/user/create-user`,user,
                {
                    headers: {
                        Authorization: `basic ${localStorage.getItem('adminToken')}`,
                }
            }
            );
              setisLoading(false)
              console.log(response)
              alert("user created seccessfully")
            
          } catch (error) {
            console.log(error);
            setisLoading(false)
            alert(error.response.data.message)     
          }
        }
        
      
    
    
    
      
    function submitRegisterForm(e){
      e.preventDefault();
      setisLoading(true)
      seterrorList([]); 
      let validation = validateRegisterForm();
      console.log(validation);
      if(validation.error){
        setisLoading(false)
        seterrorList(validation.error.details)
    
      }else{
        sendRegisterDataToApi();
      }
      
    }
    
      function getUserData(e){
        if (e && e.target) {
        let myUser={...user};
        myUser[e.target.name]= e.target.value;
        setUser(myUser);
        console.log(myUser);
        }
      }
    
      function validateRegisterForm(){
        let scheme= Joi.object({
          name:Joi.string().min(2).required(),
          phone:Joi.string(),
          email:Joi.string().required(),
          password:Joi.string(),
          durationInDays:Joi.number(),
       
    
        });
        return scheme.validate(user, {abortEarly:false});
      }
  return (
    <>
    <div className='px-2 admin' id='content'>

   <div className="d-flex justify-content-center my-4 p-1 ">
   <div className="my-form  p-3">
   
       <form onSubmit={submitRegisterForm} className='my-3' action="">
     <label htmlFor="name">Name  :</label>
     <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='name' id='name' />
     {errorList.map((err,index)=>{
     if(err.context.label ==='name'){
       return <div key={index} className="text-danger my-2">this input is required</div>
     }
     
   })}
   <label htmlFor="email">Email :</label>
     <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
     {errorList.map((err,index)=>{
     if(err.context.label ==='email'){
       return <div key={index} className="text-danger my-2">this input is required</div>
     }
     
   })}
    
   <label htmlFor="phone">Phone  :</label>
   <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='phone' id='phone' />
   {errorList.map((err,index)=>{
     if(err.context.label ==='phone'){
       return <div key={index} className="text-danger my-2">this input is required</div>
     }
     
   })}
   <label htmlFor="password">Password :</label>
     <div className='pass-box'>
     <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='password' id='password' />
     <span onClick={()=> setVisible(!visible)} className="seenpass">
     {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
     </span>
     {errorList.map((err,index)=>{
     if(err.context.label ==='password'){
       return <div key={index} className="text-danger my-2">this input is required</div>
     }
     
   })}
   </div>
   <label htmlFor="durationInDays">Duration in days :</label>
   <input onChange={getUserData} type="number" className='my-input my-2 form-control' name='durationInDays' id='durationInDays' />
   {errorList.map((err,index)=>{
     if(err.context.label ==='durationInDays'){
       return <div key={index} className="text-danger my-2">this input is required</div>
     }
     
   })}
   
     <button className='btn btn-green mt-3'>
       {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'Create Account'}
     </button>
    </form>
    
    
    </div>
    </div>
    </div>
    
   </>
  )
}

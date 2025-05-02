import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Navbar({logout}) {
  const [visible,setVisible]=useState(false)

  useEffect(()=>{
    getCategs()
  },[])
  const [categories,setCategs]=useState([])
  async function getCategs() {
    try {
      const response = await axios.get('https://zad.onrender.com/match/get-all-categ',{
        headers: {
            Authorization: `basic ${localStorage.getItem('userToken')}`,
    }
});
      console.log(response)
      setCategs(response.data.data)
      
    } catch (error) {
      console.error(error);
    }
  }
 
  return (
    <>
    {/* Navbar */}
    <nav className="navbar position-relative">
        <div className="logo ">
          <img className='main-logo' src={logo} alt="Logo"/>Top Matches
          <button className='arrow-dropdown' onClick={() => setVisible(!visible)}><i class="fa-solid fa-caret-down ms-2"></i> </button> 
            
               
          </div>
        <div className={`arrow-dropdown-content ${visible?`d-block`:`d-none`}`} >
          {categories.map((cat) => (
            <a href={`http://localhost:3000/display-categ/${cat.name}/${cat._id}`} key={cat._id} className="categ-item-others">
              <img src={cat.img} alt="" />
              {cat.name}</a>
          ))}
        </div>
          
        <button onClick={logout} className="btn btn-outline-warning fw-bold me-3">Logout</button>
      </nav>
    </>
  )
}

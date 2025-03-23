import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

export default function AdminNav({logoutAdmin}) {
    const [sideToggle ,setSideToggle]=useState(false);
    useEffect(()=>{
      // console.log(userData)
    },[])      
        useEffect(() => {
          const handleClick = (e) => {
            const allSideMenu = document.querySelectorAll('.side-menu.top li a');
            const li = e.currentTarget.parentElement;
      
            allSideMenu.forEach((i) => {
              i.parentElement.classList.remove('active');
            });
            
            li.classList.add('active');
          };
      
          const allSideMenu = document.querySelectorAll('.side-menu.top li a');
          allSideMenu.forEach((item) => {
            item.addEventListener('click', handleClick);
          });
      
          return () => {
            allSideMenu.forEach((item) => {
              item.removeEventListener('click', handleClick);
            });
          };
        }, []);
      
  
          
    return (
      <>
      {/* <!-- start side navbar --> */} 
      <section id="sidebar" className={sideToggle? "hide" :""}>
          <a href="#" class="brand">
              <img src={logo} alt='logo'/>
          </a>
         
          <ul class="side-menu top">
          
          
              <li className='active'>
                  <Link to="/createUser">
                  <i class="fa-solid fa-user-plus bx"></i>
                  <span class="text">Create User
                  </span>
                  </Link>
              </li>
              <li>
                  <Link to="/teams">
                  <i class="fa-solid fa-users-line bx"></i>
                  <span class="text">Teams
                  </span>
                  </Link>
              </li>
              <li>
                  <Link to="/category">
                  <i class="fa-solid fa-layer-group bx"></i>
                  <span class="text">Categories
                  </span>
                  </Link>
              </li>
              <li>
              <Link onClick={logoutAdmin} class="logout" to='/admin'>
              <i class="fa-solid fa-angles-left bx"></i>
                      <span class="text">Logout</span>
                  </Link>
              </li>
          </ul>
      </section>
      
          {/* <!-- end side navbar --> */}
      <section id="content">
          {/* <!--start navbar --> */}
          <nav class="d-flex align-items-center">
              <i class="fa-solid fa-bars" onClick={()=> setSideToggle(!sideToggle)}></i>
            
          </nav>
          {/* <!--end navbar --> */}
          </section>
        
    
         
      </>
    )
  }
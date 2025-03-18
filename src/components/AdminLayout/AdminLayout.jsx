import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNav from '../AdminNav/AdminNav';
import AdminFooter from '../AdminFooter/AdminFooter';

export default function AdminLayout({setAdminData ,adminData}) {
  let navigate= useNavigate();
     function logoutAdmin(){
       localStorage.removeItem('adminToken');
       setAdminData(null);
       navigate('/admin')
     }
     return (
       <>
       <AdminNav adminData={adminData} logout={logoutAdmin}/>
       <Outlet></Outlet>
       <AdminFooter/>
       </>
     )
   }
   
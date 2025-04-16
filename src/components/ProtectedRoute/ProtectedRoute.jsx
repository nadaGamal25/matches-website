import React from 'react'
import {Navigate}  from 'react-router-dom'

export default function ProtectedRoute({userData,children}) {
    if(localStorage.getItem('userToken') == null){
        console.log('no token')
        return <Navigate to='/'/>
     }
      else{
        return children;
      }


}


//   if(localStorage.getItem('userToken') !== null || localStorage.getItem('adminToken') ){
//     return children;
    
//  }
//   else{
//     console.log('no token')
//     return <Navigate to='/'/>
//   }

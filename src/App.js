import { useEffect, useState } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import { jwtDecode } from 'jwt-decode';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminLayout from './components/AdminLayout/AdminLayout';
import CreateUser from './components/CreateUser/CreateUser';
import Teams from './components/Teams/Teams';
import Category from './components/Category/Category';
import AddMatch from './components/AddMatch/AddMatch';
import Matches from './components/Matches/Matches';
import Users from './components/Users/Users';
import AllMatches from './components/AllMatches/AllMatches';
import WatchMatch from './components/WatchMatch/WatchMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute/ProtectedAdminRoute';
import DisplayCateg from './components/DisplayCateg/DisplayCateg';

function App() {


   const [userData, setuserData] = useState(null)

  async function saveUserData(){
    let encodedToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken)
    // console.log(userData)
  }

  const [adminData, setAdminData] = useState(null)

  async function saveAdminData(){
    let encodedToken =localStorage.getItem('adminToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setAdminData(decodedToken)
    console.log(userData)
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
    if(localStorage.getItem('adminToken') !== null){
      saveAdminData();
    }
  },[])
  
  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},
    {path:'/admin',element:<AdminLogin saveAdminData={saveAdminData} setAdminData={setAdminData} adminData={adminData}/>},
    {path:'home',element:<ProtectedRoute setuserData={setuserData} userData={userData}> <Home setuserData={setuserData}  userData={userData}/></ProtectedRoute>},
    
    {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      
      {path:'all-matches',element:<ProtectedRoute><AllMatches userData={userData}/></ProtectedRoute>},
      {path:"/watch/:id",element:<ProtectedRoute><WatchMatch userData={userData}/></ProtectedRoute>},
      {path:"/display-categ/:categ/:id",element:<ProtectedRoute><DisplayCateg userData={userData}/></ProtectedRoute>},

    ]},
    {path:'/',element:<AdminLayout setAdminData={setAdminData} adminData={adminData}/> ,children:[
      {path:'createUser',element:<ProtectedAdminRoute><CreateUser adminData={adminData}/></ProtectedAdminRoute>},
      {path:'teams',element:<ProtectedAdminRoute><Teams adminData={adminData}/></ProtectedAdminRoute>},
      {path:'category',element:<ProtectedAdminRoute><Category adminData={adminData}/></ProtectedAdminRoute>},
      {path:'addMatch',element:<ProtectedAdminRoute><AddMatch adminData={adminData}/></ProtectedAdminRoute>},
      {path:'matches',element:<ProtectedAdminRoute><Matches adminData={adminData}/></ProtectedAdminRoute>},
      {path:'users',element:<ProtectedAdminRoute><Users adminData={adminData}/></ProtectedAdminRoute>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={routers} />
    </>
  );
}

export default App;

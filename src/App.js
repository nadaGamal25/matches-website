import { useEffect, useState } from 'react';
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

    {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      {path:'home',element:<Home userData={userData}/>},
    ]},
    {path:'/',element:<AdminLayout setAdminData={setAdminData} adminData={adminData}/> ,children:[
      {path:'createUser',element:<CreateUser adminData={adminData}/>},
      {path:'teams',element:<Teams adminData={adminData}/>},
      {path:'category',element:<Category adminData={adminData}/>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={routers} />
    </>
  );
}

export default App;

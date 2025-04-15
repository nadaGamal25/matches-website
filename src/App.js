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

function App() {
  useEffect(()=>{
    getData()
  },[])
  const [data,setData]=useState([])
  async function getData() {
    try {
      const response = await axios.get('https://zad.onrender.com/match/get-all-matchs',{
        headers: {
            Authorization: `basic ${localStorage.getItem('userToken')}`,
    }
});
      console.log(response)
      setData(response.data.data)
      
    } catch (error) {
      console.error(error);
    }
  }

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
      {path:'all-matches',element:<AllMatches userData={userData}/>},
      {path:"/watch/:id",element:<WatchMatch data={data}  userData={userData}/>},

    ]},
    {path:'/',element:<AdminLayout setAdminData={setAdminData} adminData={adminData}/> ,children:[
      {path:'createUser',element:<CreateUser adminData={adminData}/>},
      {path:'teams',element:<Teams adminData={adminData}/>},
      {path:'category',element:<Category adminData={adminData}/>},
      {path:'addMatch',element:<AddMatch adminData={adminData}/>},
      {path:'matches',element:<Matches adminData={adminData}/>},
      {path:'users',element:<Users adminData={adminData}/>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={routers} />
    </>
  );
}

export default App;

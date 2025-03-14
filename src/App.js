import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import { jwtDecode } from 'jwt-decode';

function App() {
   const [userData, setuserData] = useState(null)

  async function saveUserData(){
    let encodedToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken)
    console.log(userData)
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])
  
  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},

    {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      {path:'home',element:<Home userData={userData}/>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={routers} />
    </>
  );
}

export default App;

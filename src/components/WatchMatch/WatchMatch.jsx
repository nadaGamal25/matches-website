// pages/WatchMatch.jsx
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
const WatchMatch = ({ data }) => {
    useEffect(()=>{
        getData()
      },[])
      const [dataa,setData]=useState([])
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
  const { id } = useParams();
  const match = dataa.find(item => item._id === id);

  if (!match || !match.urls?.length) {
    return <p>No match or stream URL found</p>;
  }

  return (
    <div className="watch-page">
      <h2>{match.firstTeam.name} vs {match.secondTeam.name}</h2>
      <ReactPlayer
        url={match.urls[0].url}
        controls
        playing
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default WatchMatch;

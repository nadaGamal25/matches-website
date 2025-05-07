import ReactPlayer from 'react-player';
import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function AllMatches() {
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
    
      function formatMatchDate(dateStr) {
        const date = new Date(dateStr);
      
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      
        const utcTime = `${hours}:${minutes}`;
      
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getUTCDate();
        const month = monthNames[date.getUTCMonth()];
      
        return `${utcTime} - ${month} ${day}`;
      }
    
      function getMatchStatus(matchDateStr) {
        const matchTime = new Date(matchDateStr); // match time in ISO or local format
        const now = new Date(); // device local time
      
        const ninetyMins = 90 * 60 * 1000;
      
        if (now < matchTime) {
          return "upcoming";
        } else if (now >= matchTime && now <= new Date(matchTime.getTime() + ninetyMins)) {
          return "live";
        } else {
          return "watch";
        }
      }
      
  return (
    <>
    <div className="home-page min-vh-100">
    <div className="trending-section bg-blue">
      <h3 className="section-title text-center">
       All Matches
</h3>
       {[...new Map(
        data
          .filter(match => match.categ && match.categ._id) // filter out null or missing _id
          .map(match => [match.categ._id, match.categ])
      ).values()].map((category, i) => {
        const matchesForCategory = data
          .filter(match => match.categ && match.categ._id === category._id);
      
        return (
          <div className="trending-container" key={category._id}>
      <div className="trending-header">
        <h3>
        <img className="categ-logo" src={category.img.replace('public', 'https://zad.onrender.com')} alt="" /> {category.name}
        </h3>
      </div>
      
      {matchesForCategory.map(match => (
        <div className="match-main-row">
<div key={match._id} className="match-row">
          <div className="match-info2">
            <div className='d-flex'>
            <img
                src={match?.stadium?.img?.replace('public', 'https://zad.onrender.com')}
                alt={match.stadium?.name}
                className="team-logo2 me-2"
              />
            <div className="match-time2">
            {formatMatchDate(match.date)}
            </div>
            </div>
          
          </div>
          
          {match.firstTeam?
          <div className="teams-container">
            <div className="team">
              <span className="team-name">{match.firstTeam.name}</span>
              <img
                src={match.firstTeam.image.replace('public', 'https://zad.onrender.com')}
                alt={match.firstTeam.name}
                className="team-logo2"
              />
            </div>
            
            <span className="vs">vs</span>
            
            <div className="team">
            <img
                src={match.secondTeam.image.replace('public', 'https://zad.onrender.com')}
                alt={match.secondTeam.name}
                className="team-logo2"
              />
              <span className="team-name">{match.secondTeam.name}</span>
            </div>
          </div>
          :null}
          
          <Link
                          to={`/watch/${match._id}`}
                          className={`match-status ${getMatchStatus(match.date) === 'live' ? 'bg-live' : 'bg-accent'}`}
                        >
                          {getMatchStatus(match.date)}
                          {getMatchStatus(match.date) === 'watch' && (
                            <>
                              <i className="fa-solid fa-caret-right arrow"></i>
                            </>
                          )}
                        </Link>
          
        </div>
        <div className="match-league">{match?.desc?.slice(0,150)}...</div>

        </div>
        
      ))}
    </div>
          
        );
      })}
    </div>
    </div>
    </>
  )
}

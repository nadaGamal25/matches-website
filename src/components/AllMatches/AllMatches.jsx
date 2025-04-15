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
        const matchDate = new Date(matchDateStr);
        const matchTime = new Date(matchDate.toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
      
        const ninetyMins = 90 * 60 * 1000; // 90 minutes in ms
        console.log("Match Time (Egypt):", matchTime);
        console.log("Now (Egypt):", now);
        if (now < matchTime) {
          return "upcoming";
        } else if (now >= matchTime && now <= new Date(matchTime.getTime() + ninetyMins)) {
          return "live";
        } else {
          return "recorded";
        }
        
      }
  return (
    <>
    <div className="home-page">
    <div className="trending-section">
      <h3 className="section-title text-center">
       All Matches
</h3>
       
       <div className="match-cards">
        {data.map((match, index) => (
          <div className="match-card" key={index}  style={{ backgroundImage: `url(${match.stadium?.img?.replace('public', 'https://zad.onrender.com')})`}}>
            <div className="match-header">
              <img src={match.firstTeam.image.replace('public', 'https://zad.onrender.com')} alt={match.firstTeam.name} className="team-logo" />
              <span className="vs-text mx-4">VS</span>
              <img src={match.secondTeam.image.replace('public', 'https://zad.onrender.com')} alt={match.secondTeam.name} className="team-logo" />
            </div>
            <div className="match-info">
            <Link to={`/watch/${match._id}`}
  className={`match-status ${
    getMatchStatus(match.date) === "live" ? "bg-live" : "bg-accent"
  }`}
>
  {getMatchStatus(match.date)}
  {getMatchStatus(match.date) !== "upcoming" && (
    <>
      {" | watch "}
      <i className="fa-solid fa-caret-right arrow"></i>
    </>
  )}
</Link>

              <span className="match-time">{formatMatchDate(match.date)}</span>

              <p className="teams">{match.firstTeam.name} - {match.secondTeam.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}

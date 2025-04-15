import logo from "../../assets/logo.png"
import logo1 from "../../assets/liverpool.png"
import logo2 from "../../assets/manchester.jpg"
import ReactPlayer from 'react-player';
import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
export default function Home() {
  const trendingMatches = [
    {
      team1: "Eintracht Frankfurt",
      team2: "Ajax",
      league: "UEFA Europa League",
      time: "19:45 - Mar 13",
      status: "Upcoming",
      img1: "/images/frankfurt.png",
      img2: "/images/ajax.png",
    },
    {
      team1: "Lazio",
      team2: "Plzen",
      league: "UEFA Europa League",
      time: "19:45 - Mar 13",
      status: "recorded",
      img1: "/images/lazio.png",
      img2: "/images/plzen.png",
    },
    {
      team1: "Lazio",
      team2: "Plzen",
      league: "UEFA Europa League",
      time: "19:45 - Mar 13",
      status: "Upcoming",
      img1: "/images/lazio.png",
      img2: "/images/plzen.png",
    },
    {
      team1: "Lazio",
      team2: "Plzen",
      league: "UEFA Europa League",
      time: "19:45 - Mar 13",
      status: "Upcoming",
      img1: "/images/lazio.png",
      img2: "/images/plzen.png",
    },
    {
      team1: "Lazio",
      team2: "Plzen",
      league: "UEFA Europa League",
      time: "19:45 - Apr 08",
      status: "live",
      img1: "/images/lazio.png",
      img2: "/images/plzen.png",
    },
    {
      team1: "Athletic Club",
      team2: "AS Roma",
      league: "UEFA Europa League",
      time: "19:45 - Mar 13",
      status: "Upcoming",
      img1: "/images/athletic.png",
      img2: "/images/roma.png",
    },
  ];

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

  // function getMatchStatus(matchDateStr) {
  //   // Parse match date and adjust to Egypt time (UTC+2)
  //   const matchDateUTC = new Date(matchDateStr);
  //   const matchStart = new Date(matchDateUTC.toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
  
  //   // Match ends 90 minutes after start
  //   const matchEnd = new Date(matchStart.getTime() + 90 * 60 * 1000);
  
  //   // Get current time in Egypt time
  //   const nowEgypt = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
  
  //   if (nowEgypt < matchStart) {
  //     return "upcoming";
  //   } else if (nowEgypt >= matchStart && nowEgypt <= matchEnd) {
  //     return "live";
  //   } else {
  //     return "recorded";
  //   }
  // }
  
  function getMatchStatus(matchDateStr) {
    const matchDate = new Date(matchDateStr);
    const matchTime = new Date(matchDate.toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
  
    const ninetyMins = 90 * 60 * 1000; // 90 minutes in ms
    // console.log("Match Time (Egypt):", matchTime);
    // console.log("Now (Egypt):", now);
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
      

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Never Miss a Match Again!</h1>
        <p>Watch Live & Recorded Football Matches Anytime.</p>
        <a href='#watch' className="watch-now-btn">Watch Now</a>
      </header>

      {/* Trending Matches Section */}
      <div className="trending-section">
        <div className="d-flex justify-content-between align-content-center">
        <h3 className="section-title">
      <i class="fa-solid fa-fire text-warning"></i> Trending Matches
</h3>
        <Link className="link-view me-4" to="/all-matches">View all</Link>
        </div>
      
        {/* 🔥 
        <i class="fa-solid fa-arrow-trend-up text-warning"></i> Trending</h2> */}
       <div className="match-cards">
        {data.filter(item=> item.categ?.name.toLowerCase() ==="trending").map((match, index) => (
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
   {/* <div class="trending-section">
  <h2 class="section-title">
    <i class="fa-solid fa-fire text-warning"></i> Trending Matches
  </h2>
  <div class="match-cards row">
    {trendingMatches.map((match, index) => (
      <div class="match-card col-md-3 col-sm-6" key={index}>
        <div class="match-header">
          <img src={logo1} alt={match.team1} class="team-logo" />
          <span class="vs-text">VS</span>
          <img src={logo2} alt={match.team2} class="team-logo" />
        </div>
        <div class="match-info">
          <span class="match-status">{match.status}</span>
          <span class="match-time">{match.time}</span>
          <p class="teams">{match.team1} - {match.team2}</p>
        </div>
      </div>
    ))}
  </div>
</div> */}
<div className="trending-section" id='watch'>
<div className="d-flex justify-content-between align-content-center">
<h3 className="section-title">
      <i class="fa-solid fa-circle-play text-green"></i> Upcoming Matches
</h3>
        <Link className="link-view me-4" to="/all-matches">View all</Link>
        </div>
  
      
       
      <div className="match-cards">
        {data.filter(item=> item.categ?.name ==="upcoming").map((match, index) => (
          <div className="match-card" key={index}  style={{ backgroundImage: `url(${match.stadium?.img.replace('public', 'https://zad.onrender.com')})`}}>
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
    {/* <div className="live  p-4">
      <h2 className='text-center'>Live Matches</h2>
      <div className="py-3 m-auto text-center">
      <ReactPlayer url="https://youtu.be/pBNkcCWbjTk?si=GHwCbU-8pLrb7pnk" />
      </div>
    </div> */}
    </div>


    </>
  )
}

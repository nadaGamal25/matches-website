import React from 'react'
import logo from "../../assets/logo.png"
import logo1 from "../../assets/liverpool.png"
import logo2 from "../../assets/manchester.jpg"
import ReactPlayer from 'react-player';
import vv from "../../assets/video.mp4"
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
      status: "Upcoming",
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
  return (
    <>
<div className="home-page">
      

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Never Miss a Match Again!</h1>
        <p>Watch Live & Recorded Football Matches Anytime.</p>
        <button className="watch-now-btn">Watch Now</button>
      </header>

      {/* Trending Matches Section */}
      <div className="trending-section">
      <h2 className="section-title">🔥 Trending Matches</h2>
      <div className="match-cards">
        {trendingMatches.map((match, index) => (
          <div className="match-card" key={index}>
            <div className="match-header">
              <img src={logo1} alt={match.team1} className="team-logo" />
              <span className="vs-text">VS</span>
              <img src={logo2} alt={match.team2} className="team-logo" />
            </div>
            <div className="match-info">
              <span className="match-status">{match.status}</span>
              <span className="match-time">{match.time}</span>
              <h3 className="league-name">{match.league}</h3>
              <p className="teams">{match.team1} - {match.team2}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="live  p-4">
      <h2 className='text-center'>Live Matches</h2>
      <div className="py-3 m-auto text-center">
      <ReactPlayer url="https://youtu.be/pBNkcCWbjTk?si=GHwCbU-8pLrb7pnk" />
      </div>
    </div>
    </div>


    </>
  )
}

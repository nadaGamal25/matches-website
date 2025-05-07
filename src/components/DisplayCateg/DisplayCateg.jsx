import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DisplayCateg() {
      const { categ,id } = useParams();
      useEffect(()=>{
        getData()
      },[])
      const [data,setData]=useState([])
      async function getData() {
        try {
          const response = await axios.get(`https://zad.onrender.com/match/get-match-by-categ/${id}`,{
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
    <div className="display-categ-container trending-section bg-blue">
    {/* <h3 className="section-title text-center">
       {categ}
</h3>   */}
        <div className='trending-container'>
        <div className="trending-header">
        <h3>
       {categ}
        </h3>
      </div>
        {data && data.map(match => (
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
              <span className="team-name">{match.firstTeam?.name}</span>
              <img
                src={(match?.secondTeam?.image || '').replace('public', 'https://zad.onrender.com')}
                alt={match.firstTeam?.name}
                className="team-logo2"
              />
            </div>
            
            <span className="vs">vs</span>
            
            <div className="team">
            <img
                src={(match?.secondTeam?.image || '').replace('public', 'https://zad.onrender.com')}
                alt={match.secondTeam?.name}
                className="team-logo2"
              />
              <span className="team-name">{match.secondTeam?.name}</span>
            </div>
          </div>:null}
          
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
        {data.length === 0?<div className='text-center text-white min-vh-100'>
                no matches in this category till now
            </div>:null}
    </div>
    </>
  )
}

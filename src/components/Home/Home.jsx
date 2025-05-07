import logo from "../../assets/logo.png"
import logo1 from "../../assets/liverpool.png"
import logo2 from "../../assets/manchester.jpg"
import ReactPlayer from 'react-player';
import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
export default function Home({userData,setuserData}) {
  let navigate= useNavigate();
  function logout(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/')
  }
  useEffect(()=>{
    getData()
    getCategs()
  },[])
  const [visible,setVisible]=useState(false)

  
  const [categories,setCategs]=useState([])
  async function getCategs() {
    try {
      const response = await axios.get('https://zad.onrender.com/match/get-all-categ',{
        headers: {
            Authorization: `basic ${localStorage.getItem('userToken')}`,
    }
});
      console.log(response)
      setCategs(response.data.data)
      
    } catch (error) {
      console.error(error);
    }
  }
  const firstSix = categories.slice(0, 6);
  const remaining = categories.slice(6);
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
<div className="home-page">
      

      {/* Hero Section */}
      <header className="hero-section">
        <div className="d-flex justify-content-between align-items-center nav-home position-relative">
          <div>
          <img src={logo} alt="" />
          <button className='arrow-dropdown text-white' onClick={() => setVisible(!visible)}> Matches <i class="fa-solid fa-caret-down ms-2"></i> </button> 
            
        <div className={`arrow-dropdown-content ${visible?`d-block`:`d-none`}`} >
          {categories.map((cat) => (
            <a href={`http://localhost:3000/display-categ/${cat.name}/${cat._id}`} key={cat._id} className="categ-item-others">
              <img src={cat.img} alt="" />
              {cat.name}</a>
          ))}
        </div>
        </div>
          <div><button onClick={logout} className="btn btn-outline-light">Logout</button></div>
        </div>
        <h1>Never Miss a Match Again!</h1>
        <p>Watch Live & Recorded Football Matches Anytime.</p>
        <Link to='/all-matches' className="watch-now-btn">Watch Now</Link>
        <div className="category-items">
      {firstSix.map((cat) => (
        <Link to={`/display-categ/${cat.name}/${cat._id}`} key={cat._id} className="categ-item">{cat.name}</Link>
      ))}

      {remaining.length > 0 && (
        <div className="dropdown categ-item">
        <span>
          OTHERS <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="dropdown-content">
          {remaining.map((cat) => (
            <Link to={`/display-categ/${cat.name}/${cat._id}`} key={cat._id} className="categ-item-others">{cat.name}</Link>
          ))}
        </div>
      </div>
       
      )}
    </div>
      </header>
      

      {[...new Map(
  data
    .filter(match => match.categ && match.categ._id) // filter out null or missing _id
    .map(match => [match.categ._id, match.categ])
).values()].map((category, i) => {
  const matchesForCategory = data
    .filter(match => match.categ && match.categ._id === category._id)
    .slice(0, 8);

  return (
    <div className="trending-section" key={category._id}>
      <div className="d-flex justify-content-between align-content-center ">
        <h3 className="section-title">
          <img className="categ-logo" src={category.img.replace('public', 'https://zad.onrender.com')} alt="" />
          {category.name}
        </h3>
        <Link className="link-view me-4" to="/all-matches">View all</Link>
      </div>

      <div className="match-cards">
        {matchesForCategory.map((match, index) => (
          <div
            className="match-card"
            key={index}
            style={{
              backgroundImage: `url(${match.stadium?.img?.replace('public', 'https://zad.onrender.com')})`
            }}
          >
            {match.firstTeam?
            <div className="match-header">
              <img
                src={match?.firstTeam?.image.replace('public', 'https://zad.onrender.com')}
                alt={match?.firstTeam?.name}
                className="team-logo"
              />
              <span className="vs-text mx-4">VS</span>
              <img
                src={match?.secondTeam?.image.replace('public', 'https://zad.onrender.com')}
                alt={match?.secondTeam?.name}
                className="team-logo"
              />
            </div>: <div className="match-header">
            <span className="vs-text py-4"></span>
              </div>}
            <div className="match-info">
              <Link
                to={`/watch/${match._id}`}
                className={`match-status ${getMatchStatus(match.date) === 'live' ? 'bg-live' : 'bg-accent'}`}
              >
                {getMatchStatus(match.date)}
                {getMatchStatus(match.date) === 'watch' && (
                  <>
                    {/* {' | watch '} */}
                    <i className="fa-solid fa-caret-right arrow"></i>
                  </>
                )}
              </Link>

              <span className="match-time">{formatMatchDate(match.date)}</span>
              <p className="teams">
                {match?.firstTeam?.name} - {match?.secondTeam?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
})}


      {/* <div className="trending-section">
        <div className="d-flex justify-content-between align-content-center">
        <h3 className="section-title">
      <img src={match.categ.img} alt="" /> {match.categ.name}
</h3>
        <Link className="link-view me-4" to="/all-matches">View all</Link>
        </div>
      
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
 
<div className="trending-section" id='watch'>
<div className="d-flex justify-content-between align-content-center">
<h3 className="section-title">
<img src={match.categ.img} alt="" /> {match.categ.name}
</h3>
        <Link className="link-view me-4" to="/all-matches">View all</Link>
        </div>
  
      
       
      <div className="match-cards">
        {data.filter(item=> item.categ?.name.toLowerCase() ==="upcoming").map((match, index) => (
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

    <div className="trending-section" id='watch'>
<div className="d-flex justify-content-between align-content-center">
<h3 className="section-title">
<img src={match.categ.img} alt="" /> {match.categ.name}
</h3>
        <Link className="link-view me-4" to="/all-matches">View all</Link>
        </div>
  
      
       
      <div className="match-cards">
        {data.filter(item=> item.categ?.name.toLowerCase() ==="league").map((match, index) => (
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
    </div>   */}
   
    </div>


    </>
  )
}

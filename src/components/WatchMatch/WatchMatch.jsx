// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import JWPlayer from 'react-jw-player';

// const WatchMatch = () => {
//   const [dataa, setData] = useState([]);
//   const [selectedUrl, setSelectedUrl] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     async function getData() {
//       try {
//         const response = await axios.get('https://zad.onrender.com/match/get-all-matchs', {
//           headers: {
//             Authorization: `basic ${localStorage.getItem('userToken')}`,
//           },
//         });
//         setData(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     getData();
//   }, []);

//   const match = dataa.find((item) => item._id === id);

//   useEffect(() => {
//     if (match && match.urls && match.urls.length > 0) {
//       setSelectedUrl(match.urls[0].url);
//     }
//   }, [match]);

//   if (!match) return <p>Loading match...</p>;
//   if (!match.urls || match.urls.length === 0) return <p>No match or stream URL found</p>;

//   return (
//     <div className="watch-page">
//       <h2>{match.firstTeam?.name} vs {match.secondTeam?.name}</h2>

//       <div className="text-center mb-1">
//         {match.urls.map((item, index) => (
//           <button
//             key={index}
//             className="btn btn-green m-1"
//             onClick={() => setSelectedUrl(item.url)}
//           >
//             {item.desc}
//           </button>
//         ))}
//       </div>

//       {selectedUrl && (
//         <div style={{ width: '100%', height: '500px' }}>
//           <JWPlayer
//             playerId="jw-player"
//             file={selectedUrl}
//             playerScript="https://cdn.jwplayer.com/libraries/your-library-id.js"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default WatchMatch;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

const WatchMatch = () => {
  const [dataa, setData] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('https://zad.onrender.com/match/get-all-matchs', {
          headers: {
            Authorization: `basic ${localStorage.getItem('userToken')}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  const match = dataa.find((item) => item._id === id);

  useEffect(() => {
    if (match && match.urls && match.urls.length > 0) {
      setSelectedUrl(match.urls[0].url);
    }
  }, [match]);

  if (!match) return <p>Loading match...</p>;

  if (!match.urls || match.urls.length === 0) return <p>No match or stream URL found</p>;


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
  return (
    <div className="watch-page">
      <h2>{match.firstTeam?.name} vs {match.secondTeam?.name}</h2>

      <div className='text-center mb-1'>
        {match.urls.map((item, index) => (
          <button
            key={index}
            className="btn btn-green m-1"
            onClick={() => setSelectedUrl(item.url)}
          >
            {item.desc}
          </button>
        ))}
      </div>

      {selectedUrl && (
        <ReactPlayer
          url={selectedUrl}
          controls
          playing
          width="100%"
          height="500px"
        />
      )}

      <div className="match-desc mt-4">
        <h3>Match Details</h3>
        <div className="row g-3">
          <div className="col-md-8">
          <span className="match-time">{formatMatchDate(match.date)}</span>
          <p>At : <strong>{match.stadium.name}</strong></p>
          {match.desc?<p>{match.desc}</p>:null}
          </div>
          <div className="col-md-4">
          <dic className="desc-img " style={{
              backgroundImage: `url(${match.stadium?.img?.replace('public', 'https://zad.onrender.com')})`
            }}>
          {/* <img
                src={match.stadium?.img?.replace('public', 'https://zad.onrender.com')}
                alt='img'
                className="team-logo"
              /> */}
          </dic>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default WatchMatch;



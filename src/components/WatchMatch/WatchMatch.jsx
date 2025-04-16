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
    </div>
  );
};

export default WatchMatch;

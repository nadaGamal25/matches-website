import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import './HlsPlayer.css'; // <- You'll create this for styles
import kk from '../../assets/matchbg.jpg'
const HlsPlayer = ({ url, previewImage, firstTeamImg, secondTeamImg }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
  
    if (!url) return; // <--- Add this check to avoid using null
  
    const handlePlaying = () => {
      setStreamStarted(true);
    };
  
    video.addEventListener('playing', handlePlaying);
  
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url); // this is the line causing the error when url is null
      hls.attachMedia(video);
      hlsRef.current = hls;
  
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levelList = hls.levels.map((level, index) => ({
          index,
          label: `${level.height}p`,
        }));
        setLevels([{ index: -1, label: 'Auto' }, ...levelList]);
      });
  
      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });
  
      return () => {
        video.removeEventListener('playing', handlePlaying);
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    }
  }, [url]);
  

  const toggleMenu = () => setShowQualityMenu((prev) => !prev);

  const selectQuality = (index) => {
    setCurrentLevel(index);
    if (hlsRef.current) hlsRef.current.currentLevel = index;
    setShowQualityMenu(false);
  };

  return (
    <div className="video-container" style={{ position: 'relative' }}>
      {!streamStarted && (
        <div
          className="video-preview"
          style={{
            backgroundImage: `url(${previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            paddingTop: '56.25%', // 16:9 aspect ratio
            position: 'relative',
          }}
        >
          <img
            src={firstTeamImg}
            alt="First Team"
            className=" left"
            style={{
              position: 'absolute',
              top: '50%',
              left: '15%',
              transform: 'translateY(-50%)',
              width: '150px',
              height: '150px',
              objectFit: 'contain',
            }}
          />
          <img
            src={secondTeamImg}
            alt="Second Team"
            className=" right"
            style={{
              position: 'absolute',
              top: '50%',
              right: '15%',
              transform: 'translateY(-50%)',
              width: '150px',
              height: '150px',
              objectFit: 'contain',
            }}
          />
        </div>
      )}

      <video
        ref={videoRef}
        controls 
        autoPlay
        className="video-element"
        style={{ display: streamStarted ? 'block' : 'none', width: '100%' }}
      />

      <div className="quality-menu-wrapper">
        {showQualityMenu && (
          <div className="quality-menu">
            {levels.map((level) => (
              <div
                key={level.index}
                className={`quality-option ${currentLevel === level.index ? 'active' : ''}`}
                onClick={() => selectQuality(level.index)}
              >
                {level.label}
              </div>
            ))}
          </div>
        )}
        <button className="quality-button" onClick={toggleMenu}>
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>
    </div>
  );
};


// const HlsPlayer = ({ url }) => {
//   const videoRef = useRef(null);
//   const hlsRef = useRef(null);
//   const [levels, setLevels] = useState([]);
//   const [currentLevel, setCurrentLevel] = useState(-1); // -1 = Auto
//   const [showQualityMenu, setShowQualityMenu] = useState(false);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (Hls.isSupported()) {
//       const hls = new Hls();
//       hls.loadSource(url);
//       hls.attachMedia(video);
//       hlsRef.current = hls;

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         const levelList = hls.levels.map((level, index) => ({
//           index,
//           label: `${level.height}p`,
//         }));
//         setLevels([{ index: -1, label: 'Auto' }, ...levelList]);
//       });

//       hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
//         setCurrentLevel(data.level);
//       });

//       return () => {
//         hls.destroy();
//       };
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = url;
//     }
//   }, [url]);

//   const toggleMenu = () => setShowQualityMenu((prev) => !prev);

//   const selectQuality = (index) => {
//     setCurrentLevel(index);
//     if (hlsRef.current) hlsRef.current.currentLevel = index;
//     setShowQualityMenu(false);
//   };

//   return (
//     <div className="video-container">
//       <video ref={videoRef} controls autoPlay className="video-element" />
//       <div className="quality-menu-wrapper">
        
//         {showQualityMenu && (
//           <div className="quality-menu">
//             {levels.map((level) => (
//               <div
//                 key={level.index}
//                 className={`quality-option ${currentLevel === level.index ? 'active' : ''}`}
//                 onClick={() => selectQuality(level.index)}
//               >
//                 {level.label}
//               </div>
//             ))}
//           </div>
//         )}
//         <button className="quality-button" onClick={toggleMenu}>
//         <i class="fa-solid fa-gear"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

export default HlsPlayer;

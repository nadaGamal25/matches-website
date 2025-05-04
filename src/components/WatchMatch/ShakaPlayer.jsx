import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player';

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const player = new shaka.Player(video);
    playerRef.current = player;

    player.load(src).then(() => {
      console.log('Video loaded');
    }).catch((err) => {
      console.error('Error loading video:', err);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      style={{
        width: '100%',
        height: '500px',
        backgroundColor: 'black'
      }}
    />
  );
};

export default ShakaPlayer;

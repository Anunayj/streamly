import React from "react";

import { useEffect, useRef } from "react";

const VideoPlayer = ({ videoSrc, socketRef }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    const videoNode = videoRef.current;

    const onSeek = () => {
      console.log('seeked');
    };

    const onPlay = () => {
      console.log('play');
    };

    const onPause = () => {
      console.log('pause');
    };

    videoNode.addEventListener('pause', onPause);
    videoNode.addEventListener('play', onPlay);
    videoNode.addEventListener('seeked', onSeek);

    return () => {
      videoNode.removeEventListener('pause', onPause);
      videoNode.removeEventListener('play', onPlay);
      videoNode.removeEventListener('seeked', onSeek);
    };
  }, []);

  return (
    <div className="mt-20 flex-1 p-4 flex justify-center items-center">
      <video ref={videoRef} className="w-full h-full" src={videoSrc} controls>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

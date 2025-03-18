import React from "react";

import { forwardRef } from "react";

const VideoPlayer = forwardRef(({ videoSrc }, ref) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <video
        ref={ref}
        className="w-full h-full object-cover"
        src={videoSrc}
        controls
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

export default VideoPlayer;

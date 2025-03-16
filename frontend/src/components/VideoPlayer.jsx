import React from "react";

import { forwardRef } from "react";

const VideoPlayer = forwardRef(
  ({ videoSrc }, ref) => {  
    return (
      <div className="mt-20 flex-1 p-4 flex justify-center items-center">
        <video ref={ref} className="w-full h-full" src={videoSrc} controls>
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
)

export default VideoPlayer;

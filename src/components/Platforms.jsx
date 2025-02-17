import React from "react";

const Platforms = () => {
  return (
    <div className="platforms flex justify-center space-x-4 md:space-x-6 mt-10 flex-wrap">
      <a
        href="#"
        className="bg-grey bg-opacity-10 px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-20 transition duration-300 text-white"
      >
        Netflix
      </a>
      <a
        href="#"
        className="bg-grey  bg-opacity-10 px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-20 transition duration-300 text-white"
      >
        Hulu
      </a>
      <a
        href="#"
        className="bg-grey bg-opacity-10 px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-20 transition duration-300 text-white"
      >
        YouTube
      </a>
      <a
        href="#"
        className="bg-grey bg-opacity-10 px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-20 transition duration-300 text-white"
      >
        Prime Video
      </a>
      <a
        href="#"
        className="bg-grey bg-opacity-10 px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-20 transition duration-300 text-white"
      >
        More
      </a>
    </div>
  );
};

export default Platforms;

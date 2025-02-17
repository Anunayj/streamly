import React from "react";
import HeroSection from "../components/HeroSection";
import JoinRoom from "../components/JoinRoom";

const Home = () => {
  return (
    <div
      className="homePageWrapper min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('../images/back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <HeroSection />
      <JoinRoom />
    </div>
  );
};

export default Home;

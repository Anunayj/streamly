import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import JoinRoom from "../components/JoinRoom";

const slides = [
  "/images/Slide1.jpg",
  "/images/Slide2.jpg",
  "/images/Slide3.jpg",
  "/images/Slide4.jpeg",
  "/images/Slide5.jpg",
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homePageWrapper min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              opacity: index === currentSlide ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <JoinRoom />
      </div>
    </div>
  );
};

export default Home;

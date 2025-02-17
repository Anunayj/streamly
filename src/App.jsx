import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Premium from "./pages/Premium";
import LearnMore from "./pages/LearnMore";
import Footer from "./components/Footer";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <Router>
        <div className="app flex flex-col min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/learn-more" element={<LearnMore />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-black bg-opacity-80 w-full fixed top-0 left-0 py-4 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4 ">
        <div className="text-2xl font-bold text-red-500">Streamly</div>
        <ul className="hidden sm:flex gap-5 text-sm  flex-space-x-6">
          <NavLink
            to="/"
            className=" text-white hover:text-red-400 transition duration-300 py-2 "
          >
            <p>Home</p>
          </NavLink>

          <NavLink
            to="/login"
            className=" text-white hover:text-red-400 transition duration-300 py-2"
          >
            <p> Log In </p>
          </NavLink>

          <NavLink
            to="/premium"
            className=" text-white hover:text-red-400 transition duration-300 py-2"
          >
            <p>Premium</p>
          </NavLink>

          <NavLink
            to="/about"
            className=" text-white hover:text-red-400 transition duration-300 py-2 "
          >
            <p>About</p>
          </NavLink>

          <NavLink
            to="/contact"
            className="text-white hover:text-red-400 transition duration-300  py-2 "
          >
            <p>Contact Us</p>
          </NavLink>

          <NavLink
            to="/learn-more"
            className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            <p>Learn More</p>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

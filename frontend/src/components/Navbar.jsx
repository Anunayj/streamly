import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <header className="bg-black bg-opacity-80 w-full fixed top-0 left-0 py-4 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-red-500">Streamly</div>
        <ul className="hidden sm:flex gap-5 text-sm">
          <NavLink to="/" className="text-white hover:text-red-400 py-2">
            Home
          </NavLink>
          <NavLink to="/login" className="text-white hover:text-red-400 py-2">
            Log In
          </NavLink>
          <NavLink to="/about" className="text-white hover:text-red-400 py-2">
            About
          </NavLink>
          <NavLink to="/contact" className="text-white hover:text-red-400 py-2">
            Contact Us
          </NavLink>
        </ul>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src="../images/menu-icon.png"
          alt="menu_icon"
          className="w-6 cursor-pointer sm:hidden"
        />
      </nav>

      {/* Sidebar Menu for Mobile */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-black transition-all ${
          visible
            ? "max-w-[250px] w-full h-screen overflow-y-auto"
            : "max-w-0 w-0"
        }`}
      >
        <div className="flex flex-col text-gray-200 ">
          {/* Close Button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer text-white hover:text-red-400"
          >
            Back
          </div>

          {/* Sidebar Links */}
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border hover:text-red-400"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border hover:text-red-400"
            to="/login"
          >
            Log In
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border hover:text-red-400"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border hover:text-red-400"
            to="/contact"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

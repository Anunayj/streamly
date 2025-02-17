import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto flex flex-col sm:grid-cols-[3fr_1fr_1fr] gap-14 bg-black text-white py-6  text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Streamly. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

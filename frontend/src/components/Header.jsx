import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-background flex justify-between items-center border-b border-gray-800">
      <h1 className="text-2xl font-bold text-white">CV Parser</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-secondary hover:text-white">
          Home
        </Link>
        <Link
          to="/upload"
          className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-sky-500"
        >
          Upload CV
        </Link>
      </nav>
    </header>
  );
};

export default Header;

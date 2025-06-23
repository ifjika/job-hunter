import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-sm text-secondary border-t border-gray-800 mt-12">
      &copy; {new Date().getFullYear()} CV Parser. Dibuat oleh Jika.
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#fd7e1d] text-white py-8 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Tagline */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="font-modak text-4xl tracking-wider">WorkOrbit</h1>
          <h2 className="font-comfortaa text-sm tracking-wide">
            Effortless Task Management
          </h2>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 text-lg"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 text-lg"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 text-lg"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 text-lg"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 text-center md:text-left">
          <a href="" className="hover:text-gray-300">
            About Us
          </a>
          <a href="" className="hover:text-gray-300">
            Contact
          </a>
          <a href="" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="" className="hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>

      {/* Trademark/Copyright */}
      <div className="text-center text-sm text-gray-200 mt-6">
        © {new Date().getFullYear()} WorkOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

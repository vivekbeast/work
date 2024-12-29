/* eslint-disable @next/next/no-img-element */
"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '../globals.css';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

const NavBar = () => {

  const {  data: session } = useSession();
  const [changeLog, setChangeLog] = useState(false);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = (e) => {
    e.preventDefault(); // Prevent default link behavior
    signOut({ callbackUrl: "/" }); // Sign out and redirect to homepage or desired page
    localStorage.clear();
    localStorage.removeItem('showForm');
    localStorage.removeItem('selectedCompany');
  };

  useEffect(()=>{
    if(session?.user){
      setChangeLog(true);
    }
  },[setChangeLog, session?.user]);


  return (
    <div className="h-[90px] shadow-lg w-screen bg-[#fd7e1d] text-white flex justify-between items-center px-6 lg:px-12">
    {/* Logo and Tagline Section */}
    <div className="text-left">
      <h1 className="font-modak text-2xl lg:text-4xl tracking-wider">
        <Link href="/">WorkOrbit</Link>
      </h1>
      <h2 className="font-comfortaa text-xs lg:text-sm tracking-wide">
        Effortless Task Management
      </h2>
    </div>

    {/* Hamburger Menu (Mobile & Tablet Only) */}
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="focus:outline-none text-white"
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>

    {/* Navigation Links (Desktop Only) */}
    <div className="hidden lg:flex space-x-10 font-semibold text-center text-md font-comfortaa">
      {changeLog ? (
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      ) : (
        <Link href="/" className="hover:underline">
          Home
        </Link>
      )}
      <Link href="/#how" className="hover:underline">
        How it Works
      </Link>
      <Link href="/#Ques" className="hover:underline">
        FAQ
      </Link>
    </div>

    {/* Sign-In Button */}
    <div className="hidden lg:flex items-center">
      {changeLog ? (
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src={session?.user?.image}
              alt="userLogo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="font-comfortaa font-medium">Hello!!, {session?.user?.name}</h1>
          </div>
          <Link
            href="/loginpage"
            onClick={handleSignOut}
            className="bg-white text-[#fd7e1d] py-2 px-4 rounded-md font-comfortaa hover:bg-gray-200 transition"
          >
            Sign Out
          </Link>
        </div>
      ) : (
        <Link
          href="/loginpage"
          className="bg-white text-lg font-semibold text-[#fd7e1d] py-2 px-4 rounded-md font-comfortaa hover:bg-gray-200 transition"
        >
          Login
        </Link>
      )}
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-[90px] left-0 w-full bg-white shadow-lg rounded-b-lg text-black z-50"
      >
        <div className="flex flex-col space-y-4 p-6">
          {changeLog ? (
            <Link
              href="/dashboard"
              className="text-lg font-comfortaa hover:text-[#fd7e1d] transition"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/"
              className="text-lg font-comfortaa hover:text-[#fd7e1d] transition"
              onClick={toggleMenu}
            >
              Home
            </Link>
          )}
          <Link
            href="/#how"
            className="text-lg font-comfortaa hover:text-[#fd7e1d] transition"
            onClick={toggleMenu}
          >
            How it Works
          </Link>
          <Link
            href="/#Ques"
            className="text-lg font-comfortaa hover:text-[#fd7e1d] transition"
            onClick={toggleMenu}
          >
            FAQ
          </Link>
          {changeLog ? (
            <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={session?.user?.image}
              alt="userLogo"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-comfortaa font-medium text-center sm:text-left">
              Hello!!, {session?.user?.name}
            </span>
            <Link
              href="/loginpage"
              onClick={handleSignOut}
              className="bg-[#fd7e1d] text-white py-2 px-4 rounded-md font-comfortaa hover:bg-[#e66d14] transition w-full sm:w-auto text-center sm:text-left"
            >
              Sign Out
            </Link>
          </div>
          
          ) : (
            <Link
              href="/loginpage"
              className="bg-[#fd7e1d] text-white py-2 px-4 rounded-md font-comfortaa hover:bg-[#e66d14] transition"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    )}
  </div>
  );
};

export default NavBar;

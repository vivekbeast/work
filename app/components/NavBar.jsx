/* eslint-disable @next/next/no-img-element */
"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '../globals.css';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavBar = () => {

  const {  data: session } = useSession();
  const [changeLog, setChangeLog] = useState(false);
  const router = useRouter();

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
    <div  className="h-[90px] shadow-lg w-screen bg-[#fd7e1d] text-white flex justify-between items-center px-12">
      {/* Logo and Tagline Section */}
      <div className="w-1/3 text-left">
        <h1 className="font-modak text-4xl tracking-wider"><Link href="/">WorkOrbit</Link></h1>
        <h2 className="font-comfortaa text-sm tracking-wide">
          Effortless Task Management
        </h2>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-10 font-semibold text-center text-md font-comfortaa w-1/3 justify-center">
        {changeLog ? <div>
          <Link href="/dashboard" className="hover:underline ">
          Dashboard
        </Link>
        </div> : <div>
        <Link href="/" className="hover:underline">
          Home
        </Link>
        </div>
        }
        
        <Link href="/#how"  className="hover:underline">
          How it Works
        </Link>
        <Link href="/#Ques" className="hover:underline">
          FAQ
        </Link>
      </div>

      {/* Sign-In Button */}
      <div className=" text-right flex justify-center items-center">
        {changeLog ? <div className=' flex flex-row w-full gap-8 justify-center items-center'>
          <div className=' h-full flex flex-row gap-2 items-center'>
            <img src={session?.user?.image} alt="userLogo" className=' w-10 h-10 rounded-full' />
            <h1 className=' font-comfortaa font-medium'>Hello!!, {session?.user?.name}</h1>
          </div>
          <Link
          href="/loginpage"
          onClick={handleSignOut}
          className="bg-white text-[#fd7e1d] py-2 px-4 h-full rounded-md font-comfortaa hover:bg-gray-200 transition"
        >
          Sign Out
        </Link>
        </div> : <div className=' '>
        <Link
          href="/login"
          // onClick={()=> router.push("/loginpage")}
          className="bg-white text-lg font-semibold text-[#fd7e1d] py-2 cursor-pointer px-4 rounded-md font-comfortaa hover:bg-gray-200 transition"
        >
          Login
        </Link>
        </div>}
      </div>
    </div>
  );
};

export default NavBar;

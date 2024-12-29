"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import land from '../../public/Land.png'
import How from '../../public/HowItWorks.jpg'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useSession } from 'next-auth/react';

const LandingPage = () => {
    const {  data: session } = useSession();
    const [activeIndex, setActiveIndex] = useState(null);
    const [alreadySigned, setAlreadySigned] = useState(false);

    const questions = [
      {
        question: "What is WorkOrbit?",
        answer: "WorkOrbit is a task management platform that simplifies assigning, tracking, and collaborating on tasks.",
      },
      {
        question: "How can I assign tasks to my team?",
        answer: "You can easily assign tasks through the admin dashboard, which allows you to track progress and set deadlines.",
      },
      {
        question: "Is WorkOrbit secure?",
        answer: "Yes, WorkOrbit uses industry-standard encryption to ensure your data is safe and secure.",
      },
      {
        question: "Can I use WorkOrbit on mobile devices?",
        answer: "Yes, WorkOrbit is fully responsive and works seamlessly on all devices, including mobiles and tablets.",
      },
      {
        question: "What are the pricing options?",
        answer: "WorkOrbit offers multiple pricing plans to suit your needs, including free and premium tiers.",
      },
    ];
  
    const toggleAnswer = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    useEffect(()=>{
      if(session?.user){
        setAlreadySigned(true);
      }
    },[setAlreadySigned,session?.user ])

  return (
    <div className="w-screen font-comfortaa flex-col bg-orange-100 text-black flex justify-center items-center px-2 lg:px-6 pt-5 h-auto">
    {/* Main Container */}
    <div className="flex flex-col lg:flex-row w-full lg:w-[98%] h-auto lg:h-[75vh] bg-white shadow-xl rounded-3xl">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 h-full flex flex-col mt-10 lg:mt-20 text-center lg:text-left gap-5 lg:gap-10 px-6 lg:px-20">
        <div>
          <h1 className="font-bold text-[28px] lg:text-[38px] text-left">
            Assign daily <span className="text-[#fd7e1d]">tasks</span> to <br className="hidden lg:block" /> <span className="text-[#fd7e1d]">boost</span> productivity!
          </h1>
        </div>
        <div className="mt-4 text-sm">
          <h1 className="font-semibold text-left">
            <span className="text-[#fd7e1d]">Ensure efficient workflow by</span> assigning tasks and tracking progress.
          </h1>
          <h1 className="font-medium text-left">
            Your Team’s Tasks, <span className="text-[#fd7e1d]">Organized and On Track</span>
          </h1>
        </div>
        <div className="flex items-center justify-center lg:justify-start mt-6">
          <Link
            href={alreadySigned ? "/dashboard" : "/register"}
            className="bg-black px-6 lg:px-8 py-2 text-[16px] lg:text-[17px] rounded-sm text-white"
          >
            {alreadySigned ? "Dashboard" : "Register"}
          </Link>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
        <Image
          src={land}
          alt="LandingImage"
          width={400}
          height={300}
          className="lg:w-[600px] lg:h-[600px]"
        />
      </div>
    </div>
  
    {/* How It Works Section */}
    <div id="how" className="flex flex-col lg:flex-row items-center justify-center overflow-hidden mt-5 w-full lg:w-[98%] h-[400px] lg:h-[75vh] bg-slate-100 shadow-xl rounded-3xl">
      <h1 className="font-semibold text-lg mb-4 lg:mb-0 lg:mr-4">How It Works? :</h1>
      <Image
  src={How}
  alt="How"
  className="w-[300px] h-[200px] lg:w-[800px] lg:h-full"
/>
    </div>
  
    {/* FAQ Section */}
    <div id="Ques" className="flex flex-col mt-5 w-full lg:w-[98%] h-auto bg-white shadow-xl rounded-3xl mb-10 p-6">
      <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Frequently Asked Questions</h2>
      {questions.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          {/* Question Row */}
          <div
            className="flex justify-between items-center cursor-pointer px-4 lg:px-10"
            onClick={() => toggleAnswer(index)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
            <div className="text-gray-500">
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          {/* Answer */}
          {activeIndex === index && (
            <p className="mt-2 text-gray-600 text-sm px-4 lg:px-10">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  </div>
  

  )
}

export default LandingPage

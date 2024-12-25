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
    <div className='w-screen font-comfortaa flex-col bg-orange-100 text-black flex justify-center items-center px-6 pt-5 h-auto'>
      <div className=' flex flex-row w-[98%] h-[75vh] bg-white shadow-xl rounded-3xl'>
        <div className=' w-1/2 h-full flex flex-col mt-20 text-center gap-10 px-20'>
            <div className='  '>
            <h1 className="font-bold text-[38px]  text-left">
               Assign daily <span className=' text-[#fd7e1d] '>tasks</span> to <br /> <span className=' text-[#fd7e1d] '>boost</span> productivity!
            </h1>
            </div>
            <div className=' mt-6 text-sm'>
            <h1 className="font-semibold text-left "><span className=' text-[#fd7e1d] '>Ensure efficient workflow by</span> assigning tasks and tracking progress.</h1>
            <h1 className="font-medium text-left">Your Team’s Tasks, <span className=' text-[#fd7e1d] '>Organized and On Track</span></h1>
            </div>
            <div className=' flex items-start mt-6'>
                <Link 
                href={alreadySigned ? "/dashboard" : "/register"} 
                className={`bg-black px-8 ${alreadySigned ? "" : ""} py-2 text-[17px] rounded-sm text-white`}
                // onClick={(e) => alreadySigned && e.preventDefault()} // Prevents click action if already signed in
                >
                 {alreadySigned ? "Dashboard" : "Register"} 
                </Link>
            </div>
        </div>
        <div className=' w-1/2 h-full justify-center items-center flex'>
        <Image src={land} alt='LandingImage' width={600} height={500}/>
        </div>
      </div>
      <div id='how' className=' flex items-center flex-row justify-center overflow-hidden mt-5 w-[98%] h-[75vh] bg-slate-100 shadow-xl rounded-3xl'>
        <h1 className='font-semibold text-lg '>How It Works? :</h1>
      <Image src={How} alt='How' width={800} height={300}/>
      </div>
      <div
      id="Ques"
      className="flex flex-col mt-5 w-[98%] h-auto bg-white shadow-xl rounded-3xl mb-10 p-6"
    >
      <h2 className="text-2xl text-center font-bold text-gray-700 mb-4">Frequently Asked Questions</h2>
      {questions.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4"
        >
          {/* Question Row */}
          <div
            className="flex justify-between items-center cursor-pointer px-10"
            onClick={() => toggleAnswer(index)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.question}
            </h3>
            <div className="text-gray-500">
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          {/* Answer */}
          {activeIndex === index && (
            <p className="mt-2 text-gray-600 text-sm px-10">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
    </div>
  )
}

export default LandingPage

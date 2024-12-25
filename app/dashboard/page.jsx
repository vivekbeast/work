"use client";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { BiXCircle } from 'react-icons/bi';
import {  toast } from 'sonner'


const DashBoard = () => {
  const [uniqueCompanyNames, setUniqueCompanyNames] = useState([]);
  const { data: session } = useSession();
  const [companyName, setCompanyName] = useState();
  const [userId, setUserId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      fetch(`http://localhost:3000/api/user?email=${session.user.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.companyName) {
            let companyNamesArray = [];
            for (let i = 1; i <= 9; i++) {
              companyNamesArray.push(`${data.companyName}${i}`);
            }
            setUniqueCompanyNames(companyNamesArray);
          }
          setCompanyName(data?.companyName);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [session]);

 const handleUserIdChange = (e) => {
  setUserId(e.target.value);
};


const handleTaskchange = (e) => {
  setTaskName(e.target.value);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!uniqueCompanyNames.includes(userId)) {
    setErrorMessage("Invalid User ID! Please use a valid User ID.");
    return;
  }
  setErrorMessage("");

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("taskDate", taskDate);
  formData.append("submissionDate", submissionDate);
  formData.append("taskDescription", taskDescription);
  formData.append("taskName",taskName);

  const promise = fetch("http://localhost:3000/api/subuser", {
    method: "POST",
    body: formData,
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) return { message: data.message };
    throw new Error(data.error || "Something went wrong!");
  });

  toast.promise(promise, {
    loading: "Submitting...",
    success: (data) => `${data.message}`,
    error: (err) => `Error: ${err.message}`,
  });

  try {
    await promise;
    setUserId("");
    setTaskDate("");
    setSubmissionDate("");
    setTaskDescription("");
    setTaskName("");
  } catch (err) {
    console.error("Submission Error:", err);
  }
};

  

  return (
    <div className='h-auto w-screen flex flex-row justify-center items-center px-4 pb-20'>
      <div className='w-1/2 flex flex-col justify-center items-center mt-8 '>
        <h1 className=' font-comfortaa text-start w-full text-3xl text-black pl-11 tracking-wide font-medium'>Live Report</h1>
        <div className='grid grid-cols-3 gap-6 justify-center items-center '>
          {uniqueCompanyNames.map((companyName, index) => (
            <div key={index} className="h-[150px] w-[200px] bg-white flex justify-center flex-col text-center rounded-lg mt-4 shadow-lg">
              <h1 className="w-full  font-semibold rounded-t-lg text-black py-3">ID - <span className=' text-black'>{companyName}</span></h1>
              <div className="w-full flex justify-center flex-col text-center py-4">
                <div className='w-10 h-10 rounded-full bg-slate-600 mx-auto'>
                  {/* TO BE ADDED */}
                </div>
              </div>
              <div className="px-2 pb-4 flex flex-row justify-center items-center gap-2">
                <h2 className="text-sm font-medium">Status:</h2>
                <div className="text-sm font-semibold text-green-500">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-1/2 justify-center items-center h-auto mb-7">
        <div className="w-full flex items-center justify-center text-start mt-10">
          <h2 className="text-xl font-semibold whitespace-normal tracking-wide font-comfortaa text-start w-full text-black">
          Unique Employee IDs in Live Report Section
          </h2>
        </div>
        <div className="w-fit h-[500px] flex flex-col justify-center items-center bg-white mt-4 py-4 px-11 rounded-lg shadow-lg">
          <h2 className="text-3xl font-medium tracking-wide font-modak text-center mb-2 text-[#fd7e1d]">Work Submission Form</h2>

          <form onSubmit={handleSubmit} className="h-[80%] flex flex-col justify-center gap-10 items-center">
            <div className='grid grid-cols-2 space-y-0 space-x-8'>
              <div className='space-y-12'>
                <div className="relative flex flex-col">
                  <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">User ID</label>
                  <input
                    type="text"
                    value={userId}
                    onChange={handleUserIdChange}
                    required
                    className="p-2 border border-[#000000A6] rounded-md w-[280px] h-11 text-black focus:outline-none"
                  />
                  {errorMessage && (
                    <div className="absolute z-20 top-12 left-0 w-full bg-red-500 text-white text-sm p-2 rounded-lg text-center">
                      <div className="flex justify-between items-center">
                        <span>{errorMessage}</span>
                        <button onClick={() => setErrorMessage('')} className="text-black absolute -top-3 -right-3 text-2xl bg-white rounded-full font-bold hover:text-[#fd7e1d]">
                          <BiXCircle />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative flex flex-col">
                  <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">Task Date</label>
                  <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    required
                    className="p-2 border border-[#000000A6] rounded-md w-[280px] h-11 text-black focus:outline-none"
                  />
                </div>
                <div className="relative flex flex-col">
                  <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">Submission Date</label>
                  <input
                    type="date"
                    value={submissionDate}
                    onChange={(e) => setSubmissionDate(e.target.value)}
                    required
                    className="p-2 border border-[#000000A6] rounded-md w-[280px] h-11 text-black focus:outline-none"
                  />
                </div>
              </div>
              <div className='space-y-6'>
              <div className="relative flex flex-col">
                  <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">Task Name</label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={handleTaskchange}
                    required
                    className="p-2 border border-[#000000A6] rounded-md w-[280px] h-11 text-black focus:outline-none"
                  />
                </div>
                <div className="relative flex flex-col">
                  <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">Task Description</label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Describe your task here"
                    rows="5"
                    required
                    className="p-2 border border-[#000000A6] rounded-md w-[280px] text-black focus:outline-none"
                  />
                </div>
                {/* <div className="relative flex flex-col">
                  <div className='h-full'>
                    <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">Upload Task Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      required
                      className="p-2 border border-[#000000A6] pt-4 rounded-md w-[280px] text-black focus:outline-none"
                    />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="flex justify-center items-center self-center">
              <button type="submit" className="px-8 py-3 text-md font-medium bg-black text-white rounded-lg shadow-md hover:text-[#fd7e1d] transition duration-300">
                Submit Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;





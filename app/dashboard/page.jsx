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
  const [taskData, setTasksData] = useState([]);
  const [uniqueUserIds, setUniqueUserIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);


 const handleUserIdChange = (e) => {
  setUserId(e.target.value);
};


const handleTaskchange = (e) => {
  setTaskName(e.target.value);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Log the values for debugging
  console.log("User ID:", userId);
  console.log("Unique Company Names:", uniqueCompanyNames);

  // Check if the userId is in the list of uniqueCompanyNames
  if (!uniqueCompanyNames.some(name => name === userId)) {
    setErrorMessage("Invalid User ID! Please use a valid User ID.");
    return;
  }
  setErrorMessage("");

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("taskDate", taskDate);
  formData.append("submissionDate", submissionDate);
  formData.append("taskDescription", taskDescription);
  formData.append("taskName", taskName);

  const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subuser`, {
    method: "POST",
    body: formData,
  }).then(async (response) => {
    const data = await response.json();
    if (response.ok) return { message: data.message };
    throw new Error(data.error || "Something went wrong!");
  });

  toast.promise(promise, {
    loading: "Submitting...",
    success: (data) => `${data.message} , Reload the page once the task is added.`,
    error: (err) => `Error: ${err.message}`,
  }, {
    duration: 3000,
    style: {
      fontSize: '22px',
      background: '#28a745',
      color: 'white',
      padding: '28px 25px',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      fontWeight: 'bold',
    }
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




  const groupedTasks = taskData.reduce((acc, user) => {
    if (!acc[user.userId]) {
      acc[user.userId] = [];
    }
    acc[user.userId].push(...user.tasks);
    return acc;
  }, {});



  const handleOpenPopup = (userId) => {
    setSelectedUserId(userId);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedUserId(null);
  };

  

  const fetchUserTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subuser`);
      const data = await response.json();

      if (response.ok) {
        setTasksData(data.userNames); // Set tasks to state
        console.log(taskData)
      } else {
        alert(data.error || "Failed to load tasks.");
      }
    } catch (error) {
      // TypeScript error handling (casting error to `unknown` and then narrowing it down)
      if (error instanceof Error) {
        alert(error.message); // Safe access to `message`
      } else {
        alert("An unexpected error occurred.");
      }
    } 
  };



useEffect(() => {
  const fetchUserData = async () => {
    if (!session?.user) return;

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${session.user.email}`;
    console.log("Constructed API URL:", apiUrl);

    try {
      const response = await fetch(apiUrl);

      // Log the response status for debugging
      console.log("API Response Status:", response.status);

      const data = await response.json();

      if (response.ok) {
        console.log("API Response Data:", data);

        if (data?.companyName) {
          const companyNamesArray = Array.from(
            { length: 9 },
            (_, i) => `${data.companyName}${i + 1}`
          );
          setUniqueCompanyNames(companyNamesArray);
          
        } else {
          console.error("No company name found in API response");
        }
        setCompanyName(data?.companyName)
      } else {
        console.error(data.error || "Failed to fetch user data");
        alert(data.error || "Failed to load user data.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching user data:", error.message);
        alert(error.message); // User-friendly error message
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  fetchUserData();
  fetchUserTasks();
}, [session]);

  
  
  

    // Get unique userIds
    useEffect(() => {
      const userIds = taskData.map((user) => user.userId);
      setUniqueUserIds(Array.from(new Set(userIds))); // Remove duplicates
    }, [taskData]);
    
  return (
    <div className="h-auto overflow-y-scroll w-screen flex flex-col-reverse lg:flex-row justify-center items-center px-4 pb-20">
  <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col justify-center items-center mt-8">
    <h1 className="font-comfortaa text-start w-full text-3xl text-black pl-11 tracking-wide font-medium">
      Live Report
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
      {uniqueUserIds
        .filter((userId) => uniqueCompanyNames.includes(userId))
        .map((userId, index) => {
          const tasks = groupedTasks[userId] || [];
          const taskCount = tasks.length;

          return (
            <div key={index} className="h-[150px] w-[200px] sm:w-[250px] bg-white flex justify-center flex-col text-center rounded-lg mt-4 shadow-lg">
              <h1 className="w-full h-[50px] font-semibold rounded-t-lg text-black py-3 bg-orange-400">
                ID - <span className='text-black'>{userId}</span>
              </h1>
              <div className='h-[100px] flex justify-center items-center'>
                <div>
                  <h3 className="font-medium">Number of tasks: {taskCount}</h3>
                  <button
                    className="text-sm text-blue-500 underline"
                    onClick={() => handleOpenPopup(userId)}
                  >
                    View Tasks
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>

    {popupOpen && selectedUserId && (
      <div className="popup fixed w-screen h-screen inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 sm:w-3/4 md:w-1/2 h-1/2 overflow-y-scroll">
          <h2 className="text-xl font-semibold mb-4">Tasks for {selectedUserId}</h2>
          <div className="space-y-4">
            {groupedTasks[selectedUserId]?.map((task, index) => (
              <div key={index} className="task-item">
                <p><strong>Task {index + 1}:</strong></p>
                <p className='overflow-x-scroll'>Description: {task.taskDescription}</p>
                <p>Status: {task.status}</p>
                <p>Task Date: {new Date(task.taskDate).toLocaleDateString()}</p>
                <p>Submission Date: {new Date(task.submissionDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={handleClosePopup}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>

  <div className="flex flex-col w-full  lg:w-1/2 justify-center items-center h-auto mb-7">
    <div className="w-full flex items-center justify-center text-start mt-10">
      <h2 className=" text-md sm:text-xl font-semibold whitespace-normal tracking-wide font-comfortaa text-start w-full text-black">
        Unique Employee IDs from {companyName}1 - {companyName}9
      </h2>
    </div>
    <div className="w-full h-[700px] sm:h-[700px] md:h-[600px] lg:h-[500px] flex flex-col  items-center bg-white mt-4 py-4 rounded-lg shadow-lg">
      <h2 className=" text-2xl sm:text-3xl font-medium tracking-wide font-modak text-center mt-6 text-[#fd7e1d]">Work Submission Form</h2>

      <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center gap-10 items-center">
  <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full'>
    <div className='space-y-12'>
      <div className="relative flex flex-col justify-center items-center">
        <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          required
          className="p-2 border border-[#000000A6] rounded-md w-[250px] sm:w-[300px] h-11 text-black focus:outline-none"
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
          className="p-2 border border-[#000000A6] rounded-md w-[250px] sm:w-[300px] h-11 text-black focus:outline-none"
        />
      </div>
      <div className="relative flex flex-col">
        <label className="absolute -top-3 left-2 text-[#000000D9] bg-[#FFFFFF] px-[12px] text-md">Submission Date</label>
        <input
          type="date"
          value={submissionDate}
          onChange={(e) => setSubmissionDate(e.target.value)}
          required
          className="p-2 border border-[#000000A6] rounded-md w-[250px] sm:w-[300px] h-11 text-black focus:outline-none"
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
          className="p-2 border border-[#000000A6] rounded-md w-[250px] sm:w-[300px] h-11 text-black focus:outline-none"
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
          className="p-2 border border-[#000000A6] rounded-md w-[250px] sm:w-[300px] text-black focus:outline-none"
        />
      </div>
    </div>
  </div>
  <div className="flex justify-center items-center self-center w-full">
    <button type="submit" className="px-8 py-3 text-md font-medium bg-black text-white rounded-lg shadow-md hover:text-[#fd7e1d] transition duration-300 w-full sm:w-auto">
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
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // For retrieving query params
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa"; // Importing Icons from react-icons
import { toast } from "react-toastify";

const Userdashboard = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [tasks, setTasks] = useState<any[]>([]); // Store tasks as an array of any type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // To control the visibility of the modal
  const [selectedTask, setSelectedTask] = useState<any | null>(null); // To store the task that is selected for status change

  useEffect(() => {
    if (userId) {
      const fetchUserTasks = async () => {
        try {
          const response = await fetch(`/api/subuser?userId=${encodeURIComponent(userId)}`);
          const data = await response.json();

          if (response.ok) {
            setTasks(data.tasks); // Set tasks to state
          } else {
            setError(data.error || "Failed to load tasks.");
          }
        } catch (error) {
          setError("An error occurred while fetching tasks.");
        } finally {
          setLoading(false); // Hide loading state
        }
      };

      fetchUserTasks();
    }
  }, [userId]);

  // Handle task status change with confirmation modal
  const handleTaskStatusChange = (taskName: string, status: string) => {
    setSelectedTask({ taskName, status });
    setShowModal(true); // Show the confirmation modal
  };

  // Proceed with task status update after confirmation
  const confirmStatusChange = async () => {
    if (selectedTask) {
      try {
        const response = await fetch(`/api/subuser`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            taskName: selectedTask.taskName,
            status: selectedTask.status,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update task: ${response.statusText}`);
        }

        const data = await response.json();

        // Update the local state with the new task status
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskName === selectedTask.taskName
              ? { ...task, status: data.task.status }
              : task
          )
        );

        toast.success(`Task status updated to "${selectedTask.status}" successfully!`);
      } catch (error) {
        console.error("Error updating task status:", error);
        toast.error("Failed to update task status. Please try again.");
      } finally {
        setShowModal(false); // Close the modal
        setSelectedTask(null); // Clear the selected task
      }
    }
  };

  // Cancel status change
  const cancelStatusChange = () => {
    setShowModal(false); // Close the modal
    setSelectedTask(null); // Clear the selected task
    toast.warning("Task status update canceled.");
  };

  const [popupVisibility, setPopupVisibility] = useState<{ [key: string]: boolean }>({});

  // Function to check if description has more than 2 words
  const isDescriptionLong = (description: string) => description.split(" ").length > 2;

  const handlePopupToggle = (id: string) => {
    setPopupVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle visibility for this specific task ID
    }));
  };

  const handlePopupClose = (id: string) => {
    setPopupVisibility((prevState) => ({
      ...prevState,
      [id]: false, // Close popup for this specific task ID
    }));
  };

  return (
    <div className="h-screen flex flex-col justify-start items-start overflow-hidden font-comfortaa">
      <div className="relative z-10 w-full max-w-6xl p-8 flex flex-col gap-8">
        <div className=" w-screen flex flex-col gap-4">
          <motion.h1
            className="text-3xl font-bold text-center text-[#fd7e1d]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            User Dashboard
          </motion.h1>

          {userId && (
            <p className="text-center text-lg font-medium text-gray-600">
              Welcome, User ID: {userId}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && <p className="text-center w-screen text-lg font-medium text-gray-600">Loading tasks...</p>}

        {/* Error State */}
        {error && <p className="text-center w-screen text-lg font-medium text-red-600">{error}</p>}

        {/* Task List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks ? (
            tasks.map((task) => (
              <motion.div
                key={task._id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-lg w-full font-semibold mb-4 text-start text-black overflow-y-scroll">{task.taskName}</h1>
                {/* Task Description */}
                <h1 className="text-lg w-full font-semibold mb-4 text-start text-black">
                  {isDescriptionLong(task.taskDescription) ? (
                    <span
                      onClick={() => handlePopupToggle(task._id)}
                      className="cursor-pointer text-blue-500 underline flex items-center gap-2 hover:text-blue-700 transition-all duration-200 ease-in-out"
                    >
                      View full description
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaChevronDown className="text-lg" />
                      </motion.div>
                    </span>
                  ) : (
                    task.taskDescription
                  )}
                </h1>
                {popupVisibility[task._id] && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }} // Initial opacity
                    animate={{ opacity: 1 }} // Animate to opacity 1 (fade-in effect)
                    exit={{ opacity: 0 }} // Exit animation when closing (fade-out effect)
                    transition={{ duration: 0.3 }} // Duration of fade-in/out
                  >
                    <motion.div
                      className="bg-white rounded-lg w-4/5 max-w-lg p-6 shadow-lg relative"
                      initial={{ scale: 0.8 }} // Initial scale (small size)
                      animate={{ scale: 1 }} // Animate to normal scale (1)
                      exit={{ scale: 0.8 }} // Exit animation when closing (scale down)
                      transition={{ duration: 0.3 }} // Duration of scale animation
                    >
                      <motion.button
                        onClick={() => handlePopupClose(task._id)}
                        className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-900"
                        whileHover={{ scale: 1.2 }} // Increase scale when hovering
                        whileTap={{ scale: 0.9 }} // Decrease scale when clicked
                      >
                        &times;
                      </motion.button>
                      <h2 className="text-xl font-semibold mb-4">Task Description</h2>
                      <p>{task.taskDescription}</p>
                    </motion.div>
                  </motion.div>
                )}

                {/* Task Dates */}
                <div className="flex flex-col w-full items-start mb-8">
                  <p className="text-sm text-green-600">
                    <span className="font-semibold text-gray-500">Task Date:</span> {new Date(task.taskDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-red-600">
                    <span className="font-semibold text-gray-500">Submission Date:</span> {new Date(task.submissionDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Buttons to Change Task Status */}
                <div className="flex flex-row items-center gap-4 mt-0">
                  <motion.button
                    onClick={() => handleTaskStatusChange(task.taskName, "Ongoing")}
                    className={`px-4 py-2 text-white rounded-md ${task.status === "Ongoing" ? "bg-blue-500" : "bg-gray-500"}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Ongoing
                  </motion.button>
                  <motion.button
                    onClick={() => handleTaskStatusChange(task.taskName, "Completed")}
                    className={`px-4 py-2 text-white rounded-md ${task.status === "Completed" ? "bg-green-500" : "bg-gray-500"}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Completed
                  </motion.button>
                </div>

                {/* Task Status */}
                <motion.div
                  className={`mt-4 text-sm font-semibold ${task.status === "Completed" ? "text-green-600" : "text-blue-600"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {task.status}
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-lg font-medium text-gray-600">No tasks available.</p>
          )}
        </div>

        {/* Confirmation Modal */}
        {showModal && selectedTask && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }} // Initial opacity
            animate={{ opacity: 1 }} // Animate to opacity 1 (fade-in effect)
            exit={{ opacity: 0 }} // Exit animation when closing (fade-out effect)
            transition={{ duration: 0.3 }} // Duration of fade-in/out
          >
            <motion.div
              className="bg-white rounded-lg w-4/5 max-w-lg p-6 shadow-lg relative"
              initial={{ scale: 0.8 }} // Initial scale (small size)
              animate={{ scale: 1 }} // Animate to normal scale (1)
              exit={{ scale: 0.8 }} // Exit animation when closing (scale down)
              transition={{ duration: 0.3 }} // Duration of scale animation
            >
              <h2 className="text-md font-semibold font-comfortaa mb-4 text-black">
                Are you sure you want to change the status of {selectedTask.taskName} to {selectedTask.status} ?
              </h2>
              <div className="flex justify-around gap-1">
                <motion.button
                  onClick={confirmStatusChange}
                  className="px-4 py-2 bg-black text-[#fd7e1d] text-sm rounded-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  Confirm
                </motion.button>
                <motion.button
                  onClick={cancelStatusChange}
                  className="px-4 py-2 bg-black text-[#fd7e1d] text-sm rounded-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Userdashboard;

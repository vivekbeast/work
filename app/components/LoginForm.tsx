// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { FaUser, FaUserShield } from "react-icons/fa"; // For user and admin icons
// import animationData from "../../public/Animation - 1734605394841.json";
// import Lottie from "react-lottie";

// const LoginForm = () => {
//   const [showForm, setShowForm] = useState("");
//   const [hideFirst, setHideFirst] = useState(true);
//   const router = useRouter();

//   const handleSelectChange = (value: string) => {
//     setShowForm(value);
//     setHideFirst(false);
//   };


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
  
//     const formData = new FormData(e.currentTarget);
//     const userId = formData.get("userId")?.toString().trim();
  
//     if (!userId) {
//       alert("User ID is required!");
//       return;
//     }
  
//     try {
//       // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";    LATER AFTER DEPLOYEMENT
//       const response = await fetch(`/api/subuser?userId=${encodeURIComponent(userId)}`, {
//         method: "GET",
//         cache: "no-cache",
//       });
  
//       if (response.ok) {
//         router.push(`/userdashboard?userId=${encodeURIComponent(userId)}`);
//       } else {
//         const { error } = await response.json();
//         alert(error || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during submission:", error);
//       alert("An unexpected error occurred. Please try again.");
//     }
//   };
  
  
  
  

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   return (
//     <div className="relative w-screen h-screen flex flex-col justify-center items-center overflow-hidden ">
//       {/* Lottie Background Animation */}
//       <div className="absolute inset-0 z-0 justify-center  w-[100%] h-[100%] items-center flex">
//         <Lottie options={defaultOptions} 
//         style={{
//           width: "60%",
//           height: "100%",
//           objectFit: "contain",
//         }}
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-md  p-8 flex flex-col gap-6">
//         {hideFirst && (
//           <>
//             <h1 className="text-3xl font-comfortaa font-extrabold text-[#fd7e1d] text-center">
//               Select Login Type
//             </h1>

//             {/* Login Type Selection */}
//             <div className="grid grid-cols-2 gap-6 text-center">
//               {/* Admin Login Option */}
//               <div
//                 onClick={() => 
//                   // handleSelectChange("Admin_Login")
//                   router.push("/register")
//                 }
//                 className="cursor-pointer p-6 border hover:scale-125 rounded-lg bg-white hover:bg-inherit transition duration-300 flex flex-col items-center justify-center"
//               >
//                 <FaUserShield className="text-4xl text-blue-600 mb-2" />
//                 <span className="text-lg font-medium">Admin Login</span>
//               </div>

//               {/* User Login Option */}
//               <div
//                 onClick={() => handleSelectChange("User_Login")}
//                 className="cursor-pointer p-6 border hover:scale-125 rounded-lg bg-white hover:bg-inherit transition duration-300 flex flex-col items-center justify-center"
//               >
//                 <FaUser className="text-4xl text-green-600 mb-2" />
//                 <span className="text-lg font-medium">User Login</span>
//               </div>
//             </div>
//           </>
//         )}

//         {!hideFirst && showForm === "User_Login" && (
//           <>
//             <h1 className="text-3xl font-extrabold text-center text-[#fd7e1d] font-comfortaa">
//               User Login
//             </h1>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//   <div className="flex flex-col gap-2">
//     <label htmlFor="userId" className="text-sm font-medium text-gray-600">
//       Unique UserId (Provided by the Company Admin)
//     </label>
//     <input
//       type="text"
//       id="userId"
//       name="userId" // Add name attribute to bind with FormData
//       className="p-3 border bg-white rounded-md text-black focus:ring-2 focus:ring-white"
//       required
//     />
//   </div>
//   <div className="flex flex-col gap-4">
//     <button
//       type="submit"
//       className="w-full px-4 py-2 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
//     >
//       Enter
//     </button>
//     <button
//       type="button"
//       onClick={() => {
//         setShowForm("");
//         setHideFirst(true);
//       }}
//       className="w-full px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//     >
//       Back
//     </button>
//   </div>
// </form>

//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

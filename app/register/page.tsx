'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BsGoogle } from 'react-icons/bs';

const SignUpMainPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setIsAuthenticated(true);

      // Check if user is already registered in the database
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?email=${session.user.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.companyName) {
            setIsRegistered(true); // User already has a company name registered
            router.push('/dashboard'); // Redirect to the dashboard if already registered
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [status, session, router]);

  const handleGoogleSignUp = async () => {
    // Perform Google sign-in
    await signIn('google', { redirect: false });
  };

  const handleCompanySubmit = async () => {
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session?.user?.name ?? 'Fallback Name',
email: session?.user?.email ?? 'Fallback Email',
          companyName,
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError('Failed to save company details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen md:min-h-[80vh]  lg:min-h-screen font-comfortaa bg-gray-100 flex flex-col justify-center items-center px-4 md:px-8">
  <div className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-lg p-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
      Sign Up Your Company
    </h1>
    <p className="text-sm md:text-base text-gray-600 text-center mb-6">
      Welcome! Please sign up with Google and provide your company name to get started.
    </p>

    {/* If user is authenticated, skip sign-up */}
    {!isAuthenticated ? (
      <div>
        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-[#fd7e1d] justify-center items-center flex gap-3 text-white py-2 px-4 rounded-md font-semibold hover:bg-[#e96b12] transition"
        >
          <BsGoogle /> Sign Up with Google
        </button>
      </div>
    ) : isRegistered ? (
      // If registered, redirect to dashboard
      null
    ) : (
      <div>
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-sm md:text-base font-medium text-gray-700"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#fd7e1d] focus:border-[#fd7e1d] text-sm md:text-base"
            placeholder="Enter your company name"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          onClick={handleCompanySubmit}
          className="w-full bg-[#fd7e1d] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#e96b12] transition"
        >
          Submit Company Name
        </button>
      </div>
    )}
  </div>

  {session?.user && (
    <div className="mt-6 text-center">
      <p className="text-sm md:text-base text-gray-800">
        Logged in as <span className="font-semibold">{session.user.name}</span>
      </p>
    </div>
  )}
</div>

  
  );
};

export default SignUpMainPage;

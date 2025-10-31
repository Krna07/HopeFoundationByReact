import React from "react";
import { Link } from "react-router-dom";

// --- Icons for Header ---
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.63-1.391-4.873-3.634-6.264-6.264l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0 2.485-2.015 4.5-4.5 4.5S3 10.735 3 8.25c0-2.485 2.015-4.5 4.5-4.5S12 5.765 12 8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75v-3.75m0 0a8.954 8.954 0 0 1 5.982-2.275M12 18v-3.75a8.954 8.954 0 0 0-5.982 2.275" />
  </svg>
);


const Start = () => {
  return (
    // --- "Bright" Background ---
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-900">
      
      {/* --- Header Panel --- */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="start-logo text-3xl font-bold text-blue-600">
              1% Impact
            </div>
            
            <nav className="start-nav hidden md:flex space-x-10">
              <a href="#services" className="font-semibold text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="font-semibold text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#support" className="font-semibold text-gray-600 hover:text-blue-600 transition-colors">Support</a>
              <a href="#contact" className="font-semibold text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            
            <div className="start-contact hidden lg:flex items-center text-sm text-gray-700 font-medium gap-6">
              <a href="tel:+919876543210" className="flex items-center hover:text-blue-600 transition-colors">
                <PhoneIcon />
                <span className="ml-1.5">+91-9876543210</span>
              </a>
              <a href="mailto:support@1%impact.in" className="flex items-center hover:text-blue-600 transition-colors">
                <EmailIcon />
                <span className="ml-1.5">support@1%impact.in</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* --- "Catchy" Hero Section --- */}
      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Introduction Text */}
            <div className="start-intro text-center md:text-left">
              {/* --- "Vibrant" Gradient Headline --- */}
              <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                Deep dive into Helping
              </h1>
              <p className="mt-6 text-3xl text-gray-600 font-medium">
                Help to Grow.
              </p>

              {/* --- "Catchy" Bouncy Button --- */}
              <Link 
                to={"/"} 
                className="mt-12 inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xl font-bold rounded-full shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 hover:animate-bounce"
              >
                Return Home
              </Link>
            </div>

            {/* Right Side: Image Placeholder */}
            {/* --- "Vibrant" Image Placeholder --- */}
            <div className="start-image-container flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-dashed border-blue-400 transform -rotate-2">
                <div className="w-full h-80 bg-blue-100 rounded-lg flex flex-col items-center justify-center gap-4">
                  <HeartIcon />
                  <span className="text-xl font-medium text-blue-700"></span>
                  <span className="text-sm text-blue-500">Your kindness changes lives.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Start;
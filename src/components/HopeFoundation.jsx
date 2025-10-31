import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

// --- SVG Icons (Bright Mode Only) ---

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.017 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275" />
  </svg>
);

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a.75.75 0 0 1-." />
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25a8.987 8.987 0 0 1 6-3.75c1.052 0 2.062.18 3 .512a8.987 8.987 0 0 1 6 3.75v-14.25a8.967 8.967 0 0 0-6-2.292Z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0 2.485-2.015 4.5-4.5 4.5S3 10.735 3 8.25c0-2.485 2.015-4.5 4.5-4.5S12 5.765 12 8.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75v-3.75m0 0a8.954 8.954 0 0 1 5.982-2.275M12 18v-3.75a8.954 8.954 0 0 0-5.982 2.275" />
  </svg>
);

// --- Main Component ---

export default function HopeFoundation() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref for dropdown

  // Landbot script loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.landbot.io/landbot-3/landbot-3.0.0.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Landbot) {
        window.myLandbot = new window.Landbot.Livechat({
          configUrl: "https://landbot.online/v3/H-3180677-X6VWR831X6IPXMS3/index.json",
        });
      }
    };
    
    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
      // You might need additional cleanup for window.myLandbot if Landbot provides it
    };
  }, []);

  // **Professional: Click outside to close dropdown**
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    // --- "Bright" Background ---
    <div className="bg-blue-50 text-gray-900">
      
      {/* --- Header --- */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Hope Foundation
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/about" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              <Link to="/causes" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Causes</Link>
              <Link to="/donate" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Donate</Link>
              <Link to="/contact" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </nav>

            {/* Auth Buttons & Profile */}
            <div className="flex items-center space-x-3">
              <Link to={"/start"}>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  Start
                </button>
              </Link>
              <Link to="/SignUp">
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                  SignUp
                </button>
              </Link>
              <Link to={"/loginpage"}>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  {userData ? "LogOut" : "Login"}
                </button>
              </Link>

              {/* Notification Bell */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownVisible((prev) => !prev)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors relative"
                >
                  <BellIcon />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* Dropdown */}
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden border border-gray-100">
                    <ul className="divide-y divide-gray-100">
                      <li className="p-3 hover:bg-gray-50 transition-colors">
                        <p className="font-medium">🎉 Thank you for your donation!</p>
                        <p className="text-sm text-gray-600">2 mins ago</p>
                      </li>
                      <li className="p-3 hover:bg-gray-50 transition-colors">
                        <p className="font-medium">📢 New campaign launched</p>
                        <p className="text-sm text-gray-600">1 hour ago</p>
                      </li>
                      <li className="p-3 hover:bg-gray-50 transition-colors">
                        <p className="font-medium">💡 Your impact is growing!</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Profile Icon */}
              {userData && (
                <button
                  onClick={() => navigate(`/dash/${userData?.data._id}`)}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <UserIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* --- "Vibrant" Hero Section --- */}
        <section className="bg-gradient-to-r from-blue-500 to-green-500">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Together, We Can Make a Difference
            </h2>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Your small help can bring big change to someone's life. Join us in our mission to spread hope.
            </p>
            <Link to={"/donate"}>
              {/* --- "Catchy" Bouncy Button --- */}
              <button className="mt-10 px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-full hover:from-green-600 hover:to-emerald-600 transform transition-all hover:scale-105 shadow-lg hover:animate-bounce">
                Donate Now
              </button>
            </Link>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Causes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Feature Card 1 */}
              <a href="feed.html" className="block p-8 bg-white rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <GiftIcon />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-900">Feed the Hungry</h3>
                <p className="text-gray-600 text-center">Provide nourishing food to families and children in need.</p>
              </a>

              {/* Feature Card 2 */}
              <a href="education.html" className="block p-8 bg-white rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <BookIcon />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-900">Educate a Child</h3>
                <p className="text-gray-600 text-center">Support quality education for underprivileged kids.</p>
              </a>

              {/* Feature Card 3 */}
              <a href="medical.html" className="block p-8 bg-white rounded-xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <HeartIcon />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-900">Medical Help</h3>
                <p className="text-gray-600 text-center">Fund life-saving medical treatments and supplies.</p>
              </a>
              
            </div>
          </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Voices of Hope</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Testimonial Card 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <img 
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-200" 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Rina" 
                  alt="Beneficiary" 
                />
                <blockquote className="text-gray-700 italic text-center">
                  "Because of your help, my daughter can now go to school. We are so grateful for this opportunity."
                </blockquote>
                <p className="text-right font-semibold text-blue-600 mt-4">- Rina's Mother</p>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <img 
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-200" 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Suresh" 
                  alt="Beneficiary" 
                />
                <blockquote className="text-gray-700 italic text-center">
                  "The medical aid I received saved my life. I have a second chance to support my family. Thank you!"
                </blockquote>
                <p className="text-right font-semibold text-blue-600 mt-4">- Suresh, Farmer</p>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <img 
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-200" 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=Priya" 
                  alt="Beneficiary" 
                />
                <blockquote className="text-gray-700 italic text-center">
                  "The daily meals we get at the center help me focus on my studies instead of my hunger."
                </blockquote>
                <p className="text-right font-semibold text-blue-600 mt-4">- Priya, Student</p>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Hope Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
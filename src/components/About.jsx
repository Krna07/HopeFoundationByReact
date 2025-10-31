import React, { useState } from "react";
// Removed: import "../App.css";

// --- Icons for Our Values ---
const PercentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v.75c0 .414.336.75.75.75h.75m0-1.5h.375c.621 0 1.125.504 1.125 1.125v.375c0 .621-.504 1.125-1.125 1.125h-.375m0-1.5h.375c.621 0 1.125.504 1.125 1.125v.375c0 .621-.504 1.125-1.125 1.125h-.375M16.5 7.5h.75a2.25 2.25 0 0 1 2.25 2.25v.75c0 .414-.336.75-.75.75h-.75m0-1.5h-.375c-.621 0-1.125.504-1.125 1.125v.375c0 .621.504 1.125 1.125 1.125h.375m0-1.5h-.375c-.621 0-1.125.504-1.125 1.125v.375c0 .621.504 1.125 1.125 1.125h.375m-13.5-3.045a4.5 4.5 0 1 0 0-6.105 4.5 4.5 0 0 0 0 6.105Zm13.5 0a4.5 4.5 0 1 0 0-6.105 4.5 4.5 0 0 0 0 6.105Z" />
  </svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.725A7.466 7.466 0 0 0 12 15.75a7.466 7.466 0 0 0-6 3m12 0a9 9 0 1 1-12 0m12 0a9 9 0 0 1-12 0m9-9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 20.25a9 9 0 1 1 12 0M6 20.25a9 9 0 0 1 12 0" />
  </svg>
);

const About = () => {
  // --- No Logic Change: State and handler are identical ---
  const [showSteps, setShowSteps] = useState(false);

  const toggleTracker = () => {
    setShowSteps((prev) => !prev);
  };
  // --- End of Unchanged Logic ---

  return (
    // --- "Bright" Background ---
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      
      {/* --- "Vibrant" Header --- */}
      <header className="header text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          About 1% Impact
        </h1>
      </header>

      <section className="section about-container max-w-4xl mx-auto space-y-10">
        
        {/* --- Who We Are Card --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="para text-lg text-gray-600 leading-relaxed">
            1% Impact is a non-profit initiative dedicated to making small
            contributions that create big changes. Our mission is to fight hunger,
            support education, and provide healthcare assistance for those in
            need.
          </p>
        </div>

        {/* --- Our Values Section --- */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="aboutcard bg-white p-6 rounded-xl shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="p-4 bg-blue-100 rounded-full inline-block mb-4">
                <PercentIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Why We're Different</h3>
              <p className="text-gray-600">
                Unlike other donation platforms, we focus on the <b>1% principle</b>.
                Everyone contributes a small, manageable portion, and together we
                create massive impact.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="aboutcard bg-white p-6 rounded-xl shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="p-4 bg-green-100 rounded-full inline-block mb-4">
                <EyeIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency First</h3>
              <p className="text-gray-600">
                Every bit of money is <b>traceable</b>. Donors can see exactly where
                their contribution went, down to the last rupee/dollar.
              </p>
            </div>

            {/* Card 3 */}
            <div className="aboutcard bg-white p-6 rounded-xl shadow-lg text-center transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="p-4 bg-purple-100 rounded-full inline-block mb-4">
                <UsersIcon />
              </div>
              <h3 className="text-xl font-bold mb-2">Direct Connection</h3>
              <p className="text-gray-600">
                Our platform enables donors to <b>connect directly with beneficiaries</b>{" "}
                if they have questions or wish to see the impact firsthand.
              </p>
            </div>
          </div>
        </div>

        {/* --- "Catchy" Tracker Demo --- */}
        <div className="tracker bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See Our Transparency in Action</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Click the button to see how we track every donation from the moment it's
            received to the moment it creates impact.
          </p>
          <button 
            onClick={toggleTracker}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 hover:animate-bounce"
          >
            {showSteps ? "Hide Tracking Demo" : "See Donation Tracking Demo"}
          </button>
          
          {/* --- "Vibrant" Stepper --- */}
          {showSteps && (
            <div className="steps text-left mt-8 space-y-4">
              
              <div className="step flex items-center p-4 bg-gray-50 rounded-lg shadow-inner">
                <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mr-4">1</span>
                <span className="text-gray-700 font-medium">✅ Donation received</span>
              </div>
              
              <div className="step flex items-center p-4 bg-gray-50 rounded-lg shadow-inner">
                <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mr-4">2</span>
                <span className="text-gray-700 font-medium">📦 Funds allocated to NGO partner</span>
              </div>
              
              <div className="step flex items-center p-4 bg-gray-50 rounded-lg shadow-inner">
                <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mr-4">3</span>
                <span className="text-gray-700 font-medium">🚚 Support items purchased & dispatched</span>
              </div>
              
              <div className="step flex items-center p-4 bg-gray-50 rounded-lg shadow-inner">
                <span className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mr-4">4</span>
                <span className="text-gray-700 font-medium">🏥 Beneficiary received healthcare aid</span>
              </div>
              
              <div className="step flex items-center p-4 bg-green-100 rounded-lg shadow-inner border border-green-200">
                <span className="bg-green-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mr-4">5</span>
                <span className="text-green-800 font-semibold">🎉 Impact confirmed & visible in your dashboard</span>
              </div>

            </div>
          )}
        </div>

        {/* --- "Bright" Contact Card --- */}
        <div className="contact bg-blue-100 p-8 rounded-xl shadow-lg text-center border-t-4 border-blue-400">
          <h3 className="text-2xl font-bold text-blue-900">Contact Us</h3>
          <p className="text-blue-800 mt-2 text-lg">
            Have any concerns or suggestions? We believe in accountability.
            Reach us at{" "}
            <a 
              href="mailto:support@1percentimpact.org" 
              className="font-bold underline hover:text-blue-600"
            >
              support@1percentimpact.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
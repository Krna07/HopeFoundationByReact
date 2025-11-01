import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

// --- MOCK DATA (Used for initial state) ---
const mockDonations = [
  { id: 1, donorName: "Rahul Sharma", amount: 2000, date: "2025-01-12", message: "Stay strong!" },
  { id: 2, donorName: "Aisha Khan", amount: 1500, date: "2025-01-15", message: "Wishing you the best" },
  { id: 3, donorName: "Rohan Patel", amount: 500, date: "2025-01-18", message: "God bless you" },
];

// --- Icons (Added new ones for "happiness") ---
const RupeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);
const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6.25A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.25V12m18 0a2.25 2.25 0 0 0-2.25-2.25H15M3 12a2.25 2.25 0 0 1 2.25-2.25H9m12 0a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 9.75M12 15v.008" />
  </svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);
const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
  </svg>
);
const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- NEW "Catchy & Happy" Icons ---
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-1.034 2.288-1.5-3.034L3.75 16.5l3.034-1.5L9 12l2.25 2.25.75 3.654Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.375c.621 1.25.621 2.72 0 3.968-.621 1.248-1.688 1.956-2.857 2.23l-1.5 3.034-1.034 2.288 2.288-1.034 3.034-1.5c1.248-.621 1.956-1.688 2.23-2.857.276-1.17.276-2.398 0-3.568-.276-1.17-1.034-2.138-2.288-2.857L18 3.75l-3.034 1.5Z" />
  </svg>
);
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-yellow-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5m-9 4.5v-4.5m1.5-3 1.5 3m5.5-3-1.5 3m0 0V6.75C13.5 5.23 12.27 4 10.75 4h-1.5C7.73 4 6.5 5.23 6.5 6.75v3Zm4 0V6.75C17.5 5.23 16.27 4 14.75 4h-1.5C11.73 4 10.5 5.23 10.5 6.75v3Z" />
  </svg>
);
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0 2.485-2.015 4.5-4.5 4.5S3 10.735 3 8.25c0-2.485 2.015-4.5 4.5-4.5S12 5.765 12 8.25Z" />
  </svg>
);


export default function NeedyDashboard() {
  
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  
  // --- Mock data for new features ---
  const goalAmount = 10000;
  const pendingClearance = 1500; // This can remain a mock value

  // --- State to manage displayed data ---
  const initialTotal = mockDonations.reduce((acc, d) => acc + d.amount, 0);
  const [totalDonations, setTotalDonations] = useState(initialTotal);
  const [percentageRaised, setPercentageRaised] = useState(
    Math.round((initialTotal / goalAmount) * 100)
  );
  const [displayedDonations, setDisplayedDonations] = useState(mockDonations);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showViewMore, setShowViewMore] = useState(true);

  // --- Handler for "View More" button ---
  const handleViewMore = async () => {
    setIsLoadingMore(true);
    const needyId = userData?.data?._id;

    if (!needyId) {
      alert("Could not find user ID to fetch donations.");
      setIsLoadingMore(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/alldonation/${needyId}`);
      const data = await res.json();

      if (res.ok && data.data) {
        setDisplayedDonations(data.data); 
        const newTotal = data.data.reduce((acc, d) => acc + d.amount, 0);
        setTotalDonations(newTotal); 
        setPercentageRaised(Math.round((newTotal / goalAmount) * 100));
        setShowViewMore(false); 
      } else {
        alert("Could not fetch all donations.");
      }
    } catch (error) {
      console.log("Error fetching donations", error);
      alert("Error fetching donations.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  // --- Handler for "Send Thanks" ---
  const handleSendThanks = (donorName) => {
    alert(`Thank you message sent to ${donorName}!`);
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("token");
    navigate('/'); 
  };

  return (
    // --- "Bright" Background ---
    <div className="min-h-screen bg-blue-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* --- "Happy" Header: Title + Status Badge --- */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
              Welcome Back, {userData?.data?.name}!
            </h1>
            <p className="text-lg text-gray-600 mt-1">Here's a summary of all the wonderful support you've received.</p>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* --- "Happy" Status Badge --- */}
            <span className="bg-yellow-100 text-yellow-800 font-semibold px-4 py-2 rounded-full text-sm flex items-center">
              Your Story is Live! <SparkleIcon />
            </span>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100 transition-colors"
              title="Logout"
            >
              <LogOutIcon />
            </button>
          </div>
        </div>

        {/* --- Two-Column Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- Left Column (Main) --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* --- "Vibrant" Fundraising Goal Tracker --- */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl flex items-center gap-6">
              <div className="flex-shrink-0 p-4 bg-yellow-100 rounded-full">
                <TrophyIcon />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Goal Progress</h2>
                <div className="flex justify-between font-bold text-blue-800 mb-1">
                  <span>Goal: ₹{goalAmount.toLocaleString('en-IN')}</span>
                  <span>{percentageRaised}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-5 rounded-full transition-all duration-500" 
                    style={{ width: `${percentageRaised}%` }}
                  ></div>
                </div>
                <p className="text-blue-600 mt-2">
                  You've raised <strong>₹{totalDonations.toLocaleString('en-IN')}!</strong>
                </p>
              </div>
            </div>

            {/* --- "Your Supporters" Card --- */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                Your Supporters
              </h2>
              <div className="space-y-5 divide-y divide-gray-200">
                
                {displayedDonations.length > 0 ? (
                  displayedDonations.map((don) => (
                    <div key={don._id || don.id} className="pt-5 flex items-start space-x-4">
                      <img 
                        className="w-12 h-12 rounded-full border-2 border-gray-200 flex-shrink-0"
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${don.donorName}`} 
                        alt={`${don.donorName}'s avatar`}
                      />
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div>
                            <p className="font-bold text-lg text-gray-800">{don.donorName}</p>
                            <p className="text-sm text-gray-500">Donated on: {new Date(don.date).toLocaleDateString()}</p>
                          </div>
                          <p className="font-extrabold text-2xl text-green-600 mt-2 sm:mt-0">
                            ₹{don.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                        
                        {/* --- "Happy" Message Bubble --- */}
                        {don.message && (
                          <p className="text-sm mt-3 text-yellow-900 italic bg-yellow-100 p-3 rounded-lg border-l-4 border-yellow-400">
                            "{don.message}"
                          </p>
                        )}

                        {/* --- "Heartfelt" Thank You Button --- */}
                        <button 
                          onClick={() => handleSendThanks(don.donorName)}
                          className="flex items-center mt-3 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-full hover:from-pink-600 hover:to-red-600 transition-colors transform hover:scale-105"
                        >
                          <HeartIcon />
                          Send Thanks
                        </button>
                        <br />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No donations found yet.</p>
                )}
              </div>

              {/* --- "View More" Button --- */}
              {showViewMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleViewMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingMore ? <SpinnerIcon /> : null}
                    {isLoadingMore ? "Loading..." : "View All Donations"}
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* --- Right Column (Sidebar) --- */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* --- Withdrawal & Balance Card --- */}
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <WalletIcon />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">My Balance</h2>
              </div>
              <div>
                <p className="text-sm text-gray-600">Available to Withdraw</p>
                <p className="text-4xl font-bold text-green-600 mb-2">
                  ₹{totalDonations.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-500">
                  (₹{pendingClearance.toLocaleString('en-IN')} pending clearance)
                </p>
              </div>
              {/* --- "Catchy" Gradient Button --- */}
              <button className="w-full mt-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 hover:animate-bounce">
                Request Withdrawal
              </button>
            </div>

            {/* --- Manage Your Story Card --- */}
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <EditIcon />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">My Story</h2>
              </div>
              <p className="text-gray-600 mb-5">
                Keep donors updated! A fresh story or a milestone update can lead to more support.
              </p>
              {/* --- "Catchy" Gradient Button --- */}
              <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 hover:animate-bounce">
                Edit My Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
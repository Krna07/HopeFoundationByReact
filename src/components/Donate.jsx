import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserProvider.jsx";

// --- Icons for a more "catchy" cause selection ---
// (No changes, already bright-mode compatible)
const EducationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25a8.987 8.987 0 0 1 6-3.75c1.052 0 2.062.18 3 .512a8.987 8.987 0 0 1 6 3.75v-14.25a8.967 8.967 0 0 0-6-2.292Z" /></svg>;
const HealthcareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0 2.485-2.015 4.5-4.5 4.5S3 10.735 3 8.25c0-2.485 2.015-4.5 4.5-4.5S12 5.765 12 8.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75v-3.75m0 0a8.954 8.954 0 0 1 5.982-2.275M12 18v-3.75a8.954 8.954 0 0 0-5.982 2.275" /></svg>;
const EnvironmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-3.867 8.287 8.287 0 0 0 3-.52Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3 3 0 0 0 3-3V9.362A8.987 8.987 0 0 0 12 3.033a8.987 8.987 0 0 0-3 6.329V15a3 3 0 0 0 3 3Z" /></svg>;
const HungerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.317 2.47-.88 3.54-1.28 1.884-3.4 3.201-5.78 3.743A9.753 9.753 0 0 1 12 21c-1.268 0-2.47-.317-3.54-.88-1.884-1.28-3.201-3.4-3.743-5.78A9.753 9.753 0 0 1 3 12c0-1.268.317 2.47.88-3.54 1.28-1.884 3.4-3.201 5.78-3.743A9.753 9.753 0 0 1 12 3c1.268 0 2.47.317 3.54.88 1.884 1.28 3.201 3.4 3.743 5.78A9.753 9.753 0 0 1 21 12Z" /></svg>;

// --- Cause Data Map ---
const causes = [
  { name: "Education", icon: <EducationIcon /> },
  { name: "Healthcare", icon: <HealthcareIcon /> },
  { name: "Environment", icon: <EnvironmentIcon /> },
  { name: "Fighting Hunger", icon: <HungerIcon /> }
];

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)


const Donate = () => {
  // --- No Logic Change: All state and handlers are identical ---
  const [income, setIncome] = useState("");
  const [donationAmount, setDonationAmount] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [frequency, setFrequency] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const {userData} = useContext(UserContext);


  const handlePercentageClick = () => {
    if (income) {
      const onePercent = (income * 0.01).toFixed(2);
      setDonationAmount(onePercent);
      setCustomMode(false);
    }
  };

  const handleCustomClick = () => {
    setCustomMode(true);
    setDonationAmount(null);
  };

  const handleCustomInput = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonate = () => {
    if (!donationAmount || !selectedCause || !frequency || !paymentMethod) {
      alert("Please fill in all fields before donating.");
      return;
    }
    else{
      fetch(`${API_URL}/donate`, {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({
           donorId: userData?.data._id,
           donorName: userData?.data.name,  // ✅ add this
           amount: +donationAmount,
           cause: selectedCause,
           frequency,
           paymentMethod
        })

      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    }
    alert(
      `Donation Summary:\nAmount: $${donationAmount}\nCause: ${selectedCause}\nFrequency: ${frequency}\nPayment Method: ${paymentMethod}`
    );
  };
  // --- End of Unchanged Logic ---

  // --- Helper styles for selection items ---
  const itemBaseStyle = "p-4 border-2 border-gray-300 rounded-lg cursor-pointer transition-all text-center font-medium hover:border-blue-500 hover:bg-blue-50";
  const itemActiveStyle = "bg-blue-600 text-white border-blue-600 shadow-lg scale-105";
  const stepBadgeStyle = "bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0";
  const stepHeaderStyle = "flex items-center gap-3";
  const labelStyle = "donation-label block text-lg font-semibold text-gray-800";

  return (
    // --- "Bright" Background ---
    <div className="bg-blue-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        {/* --- "Vibrant" Gradient Title --- */}
        <h1 className="donation-title text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          Make Your Donation
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Every contribution makes a world of difference. Follow the steps below to see your impact.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* --- Left Column: Donation Steps --- */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-2xl p-6 md:p-10 space-y-10">

          {/* Step 1: Annual Income */}
          <div className="donation-section space-y-4">
            <div className={stepHeaderStyle}>
              <div className={stepBadgeStyle}>1</div>
              <label className={labelStyle}>Calculate Your Impact</label>
            </div>
            <p className="text-sm text-gray-600 pl-10">Enter your annual income to see your 1% contribution.</p>
            <div className="relative pl-10">
              <span className="absolute inset-y-0 left-12 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number" value={income} onChange={(e) => setIncome(e.target.value)}
                className="donation-input w-full p-3 pl-8 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 50000"
              />
            </div>
          </div>

          {/* Step 2: Donation Amount */}
          <div className="donation-section space-y-4">
            <div className={stepHeaderStyle}>
              <div className={stepBadgeStyle}>2</div>
              <label className={labelStyle}>Set Your Amount</label>
            </div>
            <div className="donation-buttons grid grid-cols-2 gap-4 pl-10">
              <button
                onClick={handlePercentageClick}
                className={`${itemBaseStyle} ${!customMode && donationAmount ? itemActiveStyle : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={!income}
              >
                1% of Income
              </button>
              <button
                onClick={handleCustomClick}
                className={`${itemBaseStyle} ${customMode ? itemActiveStyle : ''}`}
              >
                Custom Amount
              </button>
            </div>
            {customMode && (
              <div className="relative pl-10">
                <span className="absolute inset-y-0 left-12 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  className="donation-input w-full p-3 pl-8 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter custom amount"
                  onChange={handleCustomInput} autoFocus
                />
              </div>
            )}
          </div>

          {/* Step 3: Select Cause */}
          <div className="donation-section space-y-4">
            <div className={stepHeaderStyle}>
              <div className={stepBadgeStyle}>3</div>
              <label className={labelStyle}>Choose Your Cause</label>
            </div>
            <div className="donation-grid grid grid-cols-2 gap-4 pl-10">
              {causes.map((cause) => (
                <div
                  key={cause.name}
                  className={`${itemBaseStyle} flex flex-col items-center justify-center gap-2 ${selectedCause === cause.name ? itemActiveStyle : "text-blue-600"}`}
                  onClick={() => setSelectedCause(cause.name)}
                >
                  {cause.icon}
                  <p>{cause.name}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Step 4: Donation Frequency */}
          <div className="donation-section space-y-4">
            <div className={stepHeaderStyle}>
              <div className={stepBadgeStyle}>4</div>
              <label className={labelStyle}>Select Frequency</label>
            </div>
            <div className="donation-buttons grid grid-cols-2 gap-4 pl-10">
              {["One-time", "Recurring"].map((freq) => (
                <button
                  key={freq}
                  className={`${itemBaseStyle} ${frequency === freq ? itemActiveStyle : ""}`}
                  onClick={() => setFrequency(freq)}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* --- Right Column: Live Summary & Payment --- */}
        <div className="lg:col-span-2">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Your Donation Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Amount:</span>
                  <span className="font-bold text-2xl text-green-600">
                    {donationAmount ? `$${donationAmount}` : <span className="text-gray-400">$0.00</span>}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Cause:</span>
                  <span className="font-semibold text-gray-800">
                    {selectedCause || <span className="text-gray-400">Not selected</span>}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600">Frequency:</span>
                  <span className="font-semibold text-gray-800">
                    {frequency || <span className="text-gray-400">Not selected</span>}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gray-200 my-6"></div>

              {/* Step 5: Payment Method */}
              <div className="donation-section space-y-4">
                <div className={stepHeaderStyle}>
                  <div className={stepBadgeStyle}>5</div>
                  <label className={labelStyle}>Payment Method</label>
                </div>
                <div className="donation-grid grid grid-cols-3 gap-3">
                  <div
                    className={`${itemBaseStyle} flex items-center justify-center p-2 ${paymentMethod === "PhonePe" ? itemActiveStyle : ""}`}
                    onClick={() => setPaymentMethod("PhonePe")}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" className="h-8 object-contain" alt="PhonePe" />
                  </div>
                  <div
                    className={`${itemBaseStyle} flex items-center justify-center p-2 ${paymentMethod === "Razorpay" ? itemActiveStyle : ""}`}
                    onClick={() => setPaymentMethod("Razorpay")}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" className="h-8 object-contain" alt="Razorpay" />
                  </div>
                  <div
                    className={`${itemBaseStyle} flex items-center justify-center p-2 ${paymentMethod === "PayPal" ? itemActiveStyle : ""}`}
                    onClick={() => setPaymentMethod("PayPal")}
                  >
                    <img src="https.upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-8 object-contain" alt="PayPal" />
                  </div>
                </div>
              </div>

              {/* --- "Catchy" Bouncy Donate Button --- */}
              <button 
                className="donation-submit w-full py-3 px-4 mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-semibold rounded-md shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 hover:animate-bounce focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:animate-none" 
                onClick={handleDonate}
                disabled={!donationAmount || !selectedCause || !frequency || !paymentMethod}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Donate;
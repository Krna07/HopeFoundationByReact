import React, { useState } from "react";
import "../App.css"; // renamed CSS file for consistency

const Donate = () => {
  const [income, setIncome] = useState("");
  const [donationAmount, setDonationAmount] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [frequency, setFrequency] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

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
    alert(
      `Donation Summary:\nAmount: $${donationAmount}\nCause: ${selectedCause}\nFrequency: ${frequency}\nPayment Method: ${paymentMethod}`
    );
  };

  return (
    <div className="donation-card">
      <h1 className="donation-title">Make a Difference Today</h1>

      {/* Annual Income */}
      <div className="donation-section">
        <p className="donation-label">Annual Income ($)</p>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="donation-input"
          placeholder="e.g., 50000"
        />
      </div>

      {/* Donation Amount */}
      <div className="donation-section">
        <p className="donation-label">Choose Donation Amount</p>
        <div className="donation-buttons">
          <button onClick={handlePercentageClick} className="donation-option">
            1% of Income
          </button>
          <button onClick={handleCustomClick} className="donation-option">
            Custom Amount
          </button>
        </div>
        {customMode && (
          <input
            type="number"
            className="donation-input"
            placeholder="Enter custom donation amount"
            onChange={handleCustomInput}
          />
        )}
        {donationAmount && (
          <div className="donation-display">
            Donation Amount: ${donationAmount}
          </div>
        )}
      </div>

      {/* Select Cause */}
      <div className="donation-section">
        <p className="donation-label">Select a Cause</p>
        <div className="donation-grid">
          {["Education", "Healthcare", "Environment", "Fighting Hunger"].map(
            (cause) => (
              <div
                key={cause}
                className={`donation-item ${
                  selectedCause === cause ? "active" : ""
                }`}
                onClick={() => setSelectedCause(cause)}
              >
                <p>{cause}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Donation Frequency */}
      <div className="donation-section">
        <p className="donation-label">Donation Frequency</p>
        <div className="donation-buttons">
          {["One-time", "Recurring"].map((freq) => (
            <button
              key={freq}
              className={`donation-frequency ${
                frequency === freq ? "active" : ""
              }`}
              onClick={() => setFrequency(freq)}
            >
              {freq}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="donation-section">
        <p className="donation-label">Select Payment Method</p>
        <div className="donation-grid">
          <div
            className={`donation-item ${
              paymentMethod === "PhonePe" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("PhonePe")}
          >
            <img src="./images/phonepay.png" height="40" alt="PhonePe Logo" />
            <p>PhonePe</p>
          </div>
          <div
            className={`donation-item ${
              paymentMethod === "Razorpay" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("Razorpay")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
              height="40"
              alt="Razorpay Logo"
            />
            <p>Razorpay</p>
          </div>
          <div
            className={`donation-item ${
              paymentMethod === "PayPal" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("PayPal")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              height="40"
              alt="PayPal Logo"
            />
            <p>PayPal</p>
          </div>
        </div>
      </div>

      {/* Donate Button */}
      <button className="donation-submit" onClick={handleDonate}>
        Donate Now
      </button>
    </div>
  );
};

export default Donate;

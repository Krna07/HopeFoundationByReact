import React, { useState } from "react";
import "./About.css"; 

const About = () => {
  const [showSteps, setShowSteps] = useState(false);

  const toggleTracker = () => {
    setShowSteps((prev) => !prev);
  };

  return (
    <>
      <header className="header">
        <h1>About Us</h1>
      </header>

      <section className="section about-container">
        <h2>Who We Are</h2>
        <p className="para" >
          1% Impact is a non-profit initiative dedicated to making small
          contributions that create big changes. Our mission is to fight hunger,
          support education, and provide healthcare assistance for those in
          need.
        </p>

        <h2>Our Values</h2>
        <div className="about-container">
          <div className="aboutcon">
            <div className="aboutcard">
            <h3>Why We're Different</h3>
            <p>
              Unlike other donation platforms, we focus on the <b>1% principle</b>.
              Everyone contributes a small, manageable portion, and together we
              create massive impact.
            </p>
          </div>
          <div className="aboutcard">
            <h3>Transparency First</h3>
            <p>
              Every bit of money is <b>traceable</b>. Donors can see exactly where
              their contribution went, down to the last rupee/dollar.
            </p>
          </div>
          <div className="aboutcard">
            <h3>Direct Connection</h3>
            <p>
              Our platform enables donors to <b>connect directly with beneficiaries</b>{" "}
              if they have questions or wish to see the impact firsthand.
            </p>
          </div>
          </div>
        </div>

        <div className="contact">
          <h3>Contact Us</h3>
          <p>
            Have any concerns or suggestions? We believe in accountability.
            Reach us at{" "}
            <a href="mailto:support@1percentimpact.org">
              support@1percentimpact.org
            </a>
          </p>
        </div>

        {/* Tracker Demo */}
        <div className="tracker">
          <button onClick={toggleTracker}>
            {showSteps ? "Hide Tracking Demo" : "See Donation Tracking Demo"}
          </button>
          {showSteps && (
            <div className="steps">
              <div className="step">✅ Donation received</div>
              <div className="step">📦 Funds allocated to NGO partner</div>
              <div className="step">🚚 Support items purchased & dispatched</div>
              <div className="step">🏥 Beneficiary received healthcare aid</div>
              <div className="step">
                🎉 Impact confirmed & visible in your dashboard
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default About;

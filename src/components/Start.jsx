import React from "react";
import "../App.css"; // Ensure you rename your CSS file accordingly
import { Link } from "react-router-dom";

const Start = () => {
        // let navigate=useNavigate()

  return (
    <div className="start-container">
      {/* Header Panel */}
      <header className="start-header">
        <div className="start-logo">1% Impact</div>
        <nav className="start-nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#support">Support</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="start-contact">
          📞 +91-9876543210 | ✉️ support@1%impact.in
        </div>
      </header>

      {/* Image container */}
      {/* <div className="start-image-container"></div> */}

      {/* Decorative container */}
      {/* <div className="start-decorative"></div> */}

      {/* Introduction section */}
      <div className="start-intro">
        Deep dive in Helping
        <p>help to Grow</p>
      </div>
      
      <Link to={"/"} ><button>Return</button></Link>
     
    </div>
  );
};

export default Start;

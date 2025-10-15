import React, { useContext, useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

export default function HopeFoundation() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const {userData} = useContext(UserContext);
  const navigate = useNavigate();


    useEffect(() => {
    // Load Landbot script dynamically
    const script = document.createElement("script");
    script.src = "https://static.landbot.io/landbot-3/landbot-3.0.0.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Once loaded, initialize Landbot widget
      window.myLandbot = new window.Landbot.Livechat({
        configUrl: "https://landbot.online/v3/H-3180677-X6VWR831X6IPXMS3/index.json",
      });
    };
  }, []);

  return (
    <div>
      <header className="header">
        <h1 className="logo" ></h1>
        <div className="nav">
          <Link to={"/"} >Home</Link>
          <Link to={"/about"} >About</Link>
          <Link to={"/causes"} >Causes</Link>
          <Link to={"/donate"} >Donate</Link>
          <Link to={"/contact"} >Contact</Link>
        </div>
        <div className="auth-buttons">
          <Link to={"/start"}><button>Start</button></Link>
          <Link to="/SignUp"><button>SignUp</button></Link>
          <Link to={"/loginpage"}><button>{userData? "LogOut":"Login"}</button></Link>
          {/* Notification Bell */}
          <div
            className="notification-bell"
            onClick={() => setDropdownVisible((prev) => !prev)}
          >
            🔔
            <span className="badge">3</span>
          </div>

          {/* Dropdown only renders when visible */}
          {dropdownVisible && (
            <div className="notification-dropdown show">
              <ul>
                <li>🎉 Thank you for your donation!</li>
                <li>📢 New campaign launched: Medical Aid</li>
                <li>💡 Your impact is growing every day!</li>
              </ul>
            </div>
          )}

          {/* <a href="dashboard.html" className="profile-icon">
            
          </a> */}
         <div className="profile-icon" onClick={()=>{
           navigate(`/dash/${userData?.data._id}`)
         }}></div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Together, We Can Make a Difference</h2>
          <p>Your small help can bring big change to someone's life.</p>
            <Link to={"/donate"}><button>Donate Now</button></Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-box">
          <a href="feed.html">
            <h3>Feed the Hungry</h3>
            <p>Provide food to families in need.</p>
          </a>
        </div>
        <div className="feature-box">
          <a href="education.html">
            <h3>Educate a Child</h3>
            <p>Support education for underprivileged kids.</p>
          </a>
        </div>
        <div className="feature-box">
          <a href="medical.html">
            <h3>Medical Help</h3>
            <p>Fund medical treatments and supplies.</p>
          </a>
        </div>
      </section>

      <section className="testimonials">
        <h2>Voices of Hope</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <img src="beneficiary1.jpg" alt="Smiling face of Rina" />
            <p className="quote">
              "Because of your help, my daughter can now go to school. We are so
              grateful for this opportunity."
            </p>
            <p className="author">- Rina's Mother, West Bengal</p>
          </div>
          <div className="testimonial-card">
            <img src="beneficiary2.jpg" alt="Smiling face of Suresh" />
            <p className="quote">
              "The medical aid I received saved my life. I have a second chance
              to support my family. Thank you!"
            </p>
            <p className="author">- Suresh, Farmer</p>
          </div>
          <div className="testimonial-card">
            <img src="beneficiary3.jpg" alt="Smiling child" />
            <p className="quote">
              "The daily meals we get at the center help me focus on my studies
              instead of my hunger. I love learning!"
            </p>
            <p className="author">- Priya, Student</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 1% Impact. All rights reserved.</p>
      </footer>
    </div>
  );
}

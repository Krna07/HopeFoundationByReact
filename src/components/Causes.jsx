import React from "react";
import "../App.css"

const causesData = [
  {
    icon: "🍲",
    title: "Feed the Hungry",
    desc: "Provide nutritious meals to families struggling with hunger.",
  },
  {
    icon: "📚",
    title: "Educate a Child",
    desc: "Sponsor school supplies and tuition for underprivileged children.",
  },
  {
    icon: "🏥",
    title: "Medical Aid",
    desc: "Fund healthcare and life-saving medicines for those in need.",
  },
  {
    icon: "🌳",
    title: "Plant Trees",
    desc: "Support reforestation projects and fight climate change.",
  },
  {
    icon: "💧",
    title: "Clean Water",
    desc: "Help build wells and provide safe drinking water to villages.",
  },
  {
    icon: "🏠",
    title: "Support Shelters",
    desc: "Provide housing and care for homeless and abandoned individuals.",
  },
];

const Causes = () => {
  return (
    <div className="causes-wrapper">
      <header className="causes-header-section">
        <h1 className="causes-title">Our Causes</h1>
        <p className="causes-subtitle">Together, even 1% makes a big difference.</p>
      </header>

      <div className="causes-grid">
        {causesData.map((cause, index) => (
          <div className="causes-card" key={index}>
            <div className="causes-icon">{cause.icon}</div>
            <h3 className="causes-card-title">{cause.title}</h3>
            <p className="causes-card-desc">{cause.desc}</p>
            <a href="#" className="causes-btn">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Causes;

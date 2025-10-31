import React from "react";
// Removed: import "../App.css";

// --- Professional SVG Icons ---
const HungerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.317 2.47-.88 3.54-1.28 1.884-3.4 3.201-5.78 3.743A9.753 9.753 0 0 1 12 21c-1.268 0-2.47-.317-3.54-.88-1.884-1.28-3.201-3.4-3.743-5.78A9.753 9.753 0 0 1 3 12c0-1.268.317-2.47.88-3.54 1.28-1.884 3.4-3.201 5.78-3.743A9.753 9.753 0 0 1 12 3c1.268 0 2.47.317 3.54.88 1.884 1.28 3.201 3.4 3.743 5.78A9.753 9.753 0 0 1 21 12Z" /></svg>;
const EducationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25a8.987 8.987 0 0 1 6-3.75c1.052 0 2.062.18 3 .512a8.987 8.987 0 0 1 6 3.75v-14.25a8.967 8.967 0 0 0-6-2.292Z" /></svg>;
const MedicalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5S12 5.765 12 8.25c0 2.485-2.015 4.5-4.5 4.5S3 10.735 3 8.25c0-2.485 2.015-4.5 4.5-4.5S12 5.765 12 8.25Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75v-3.75m0 0a8.954 8.954 0 0 1 5.982-2.275M12 18v-3.75a8.954 8.954 0 0 0-5.982 2.275" /></svg>;
const TreesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-3.867 8.287 8.287 0 0 0 3-.52Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3 3 0 0 0 3-3V9.362A8.987 8.987 0 0 0 12 3.033a8.987 8.987 0 0 0-3 6.329V15a3 3 0 0 0 3 3Z" /></svg>;
const WaterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyan-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-1.631-.41-3.17-1.146-4.52M3.75 10.5a8.964 8.964 0 0 1 4.319-7.468 8.964 8.964 0 0 1 7.862 0 8.964 8.964 0 0 1 4.319 7.468M12 3v1.658c0 .354.12.696.33.97l.327.41c.21.273.49.49.796.643A7.47 7.47 0 0 1 15 6.75c1.66 0 3.19.67 4.33 1.75" /></svg>;
const ShelterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;


const causesData = [
  {
    icon: <HungerIcon />,
    iconBg: "bg-yellow-100",
    title: "Feed the Hungry",
    desc: "Provide nutritious meals to families struggling with hunger.",
  },
  {
    icon: <EducationIcon />,
    iconBg: "bg-blue-100",
    title: "Educate a Child",
    desc: "Sponsor school supplies and tuition for underprivileged children.",
  },
  {
    icon: <MedicalIcon />,
    iconBg: "bg-red-100",
    title: "Medical Aid",
    desc: "Fund healthcare and life-saving medicines for those in need.",
  },
  {
    icon: <TreesIcon />,
    iconBg: "bg-green-100",
    title: "Plant Trees",
    desc: "Support reforestation projects and fight climate change.",
  },
  {
    icon: <WaterIcon />,
    iconBg: "bg-cyan-100",
    title: "Clean Water",
    desc: "Help build wells and provide safe drinking water to villages.",
  },
  {
    icon: <ShelterIcon />,
    iconBg: "bg-purple-100",
    title: "Support Shelters",
    desc: "Provide housing and care for homeless and abandoned individuals.",
  },
];

const Causes = () => {
  return (
    // --- "Bright" Background ---
    <div className="causes-wrapper min-h-screen bg-blue-50 py-12 px-4">
      
      {/* --- "Vibrant" Header --- */}
      <header className="causes-header-section text-center mb-12">
        <h1 className="causes-title text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          Our Causes
        </h1>
        <p className="causes-subtitle mt-4 text-xl text-gray-600">
          Together, even 1% makes a big difference.
        </p>
      </header>

      {/* --- "Catchy" Card Grid --- */}
      <div className="causes-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {causesData.map((cause, index) => (
          <div 
            className="causes-card bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-all hover:shadow-2xl hover:-translate-y-2" 
            key={index}
          >
            {/* --- Colorful Icon Background --- */}
            <div className={`causes-icon p-5 rounded-full ${cause.iconBg} mb-5`}>
              {cause.icon}
            </div>
            
            <h3 className="causes-card-title text-2xl font-bold text-gray-900 mb-3">
              {cause.title}
            </h3>
            <p className="causes-card-desc text-gray-600 mb-6">
              {cause.desc}
            </p>
            
            {/* --- "Vibrant" Button --- */}
            <a 
              href="#" 
              className="causes-btn mt-auto inline-block px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Causes;
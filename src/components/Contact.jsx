import React from "react";
// Removed: import "../App.css"; 
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";


// --- Icons for Contact Info ---
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.63-1.391-4.873-3.634-6.264-6.264l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);


const Contact = () => {

  // --- No Logic Change: All logic is identical ---
  const {
    handleSubmit,
    register,
    reset
  } = useForm();



  const currentTime = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});


  // const alldata = async (data) => {
  //   console.log(data);

  //   try {
  //     const res = await fetch("http://localhost:5000/message", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const response = await res.json();
  //     console.log("Data:", response);
  //     reset();
      
  //     // Show success alert
  //     alert("Thank you! Your message has been sent.");

  //   } catch (err) {
  //     console.error("Error:", err);
  //     alert("Failed to send message. Please try again.");
  //   }
  // };
  // --- End of Unchanged Logic ---

const alldata = async (data) => {
  console.log(data)
  const templateParams = {
    name: data.name,
    email: data.email,
    message: data.message,
    date: currentTime
  };

  emailjs
    .send(
      "service_h04mhgh",
      "template_0n68tag",
      templateParams,
      "zFUyf9-RAXn1NgxcL"
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("✅ Email Sent Successfully!");
        reset();
      },
      (error) => {
        console.log("FAILED...", error);
        alert("❌ Email Send Failed!");
      }
    );
};



  return (
    // --- "Bright" Background ---
    <div className="contact-container min-h-screen bg-blue-50 py-12 px-4">
      <header className="contact-container__header text-center mb-12">
        {/* --- "Vibrant" Gradient Title --- */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello,
          drop us a line.
        </p>
      </header>

      <section className="contact-container__section max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* --- Left Column: "Catchy" Info Cards --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="p-4 bg-blue-100 rounded-full">
              <PhoneIcon />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600 mt-1">+91-9876543210</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="p-4 bg-blue-100 rounded-full">
              <EmailIcon />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
              <p className="text-gray-600 mt-1">support@1%impact.in</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="p-4 bg-blue-100 rounded-full">
              <MapPinIcon />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
              <p className="text-gray-600 mt-1">123 Hope Street, New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* --- Right Column: Contact Form Card --- */}
        <form 
          className="contact-container__form bg-white rounded-xl shadow-2xl p-8 space-y-6" 
          onSubmit={handleSubmit(alldata)}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="contact-container__input w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: true })} // Added react-hook-form validation
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              className="contact-container__input w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: true })} // Added react-hook-form validation
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your Message"
              className="contact-container__textarea w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("message", { required: true })} // Added react-hook-form validation
            ></textarea>
          </div>
          
          {/* --- "Catchy" Bouncy Button --- */}
          <button 
            type="submit" 
            className="contact-container__button w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-semibold rounded-md shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 hover:animate-bounce focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
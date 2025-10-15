import React from "react";
import "../App.css"; // still using the same file, just new class names
import { useForm } from "react-hook-form";


const Contact = () => {

 const {
  handleSubmit,
  register,
  reset
 } = useForm();

 const alldata =async(data)=>{
  console.log(data)

  try {
      const res = await fetch("http://localhost:5000/message", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
  
      const response = await res.json();
      console.log("Data:", response);
      reset()
  
      // Navigate if successful
      // if (response.message === "User logged successfully") {
      //     navigate('/home');
      // }
  } catch (err) {
      console.error("Error:", err);
  }

 }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Thank you! Your message has been sent.");
  // };

  return (
    <div className="contact-container">
      <header className="contact-container__header">
        <h1>Contact Us</h1>
      </header>

      <section className="contact-container__section">
        <form className="contact-container__form" onSubmit={handleSubmit(alldata)}>
          <input
            type="text"
            placeholder="Your Name"
            className="contact-container__input"
            {...register("name")}

            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="contact-container__input"
            {...register("email")}
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="contact-container__textarea"
            {...register("message")}
            required
          ></textarea>
          <button type="submit" className="contact-container__button">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;

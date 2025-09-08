import React from "react";
import "../App.css"; // still using the same file, just new class names

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div className="contact-container">
      <header className="contact-container__header">
        <h1>Contact Us</h1>
      </header>

      <section className="contact-container__section">
        <form className="contact-container__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="contact-container__input"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="contact-container__input"
            required
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="contact-container__textarea"
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

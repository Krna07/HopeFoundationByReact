import React from 'react';
import { useForm } from "react-hook-form";
import "./sign.css";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const API_URL = import.meta.env.VITE_API_URL;

  // const Alldata = async (data) => {
  //   console.log("Submission on the way.....", data);

  //   try {
  //     const res = await fetch(`${API_URL}/logged`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const response = await res.json();
  //     console.log("Data:", response);

  //     reset();

  //     if (response.message === "User logged successfully") {
  //       navigate("/loginpage");
  //     } else {
  //       alert(response.message || "Something went wrong!");
  //     }

  //   } catch (err) {
  //     console.error("Error:", err);
  //     alert("Failed to connect to the server.");
  //   }
  // };


  const Alldata = async (data) => {
  console.log("Submitting:", data);

  try {
    const res = await fetch(`${API_URL}/logged`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    console.log("Response:", response);

    if (res.ok) {
      // ✅ store JWT token in localStorage
      localStorage.setItem("token", response.token);
      alert("Signup successful!");
      reset();
      navigate("/loginpage");
    } else {
      alert(response.message || "Something went wrong!");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to connect to the server.");
  }
};


  return (
    <div className="formbody">
      <form onSubmit={handleSubmit(Alldata)} className="login-form">

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit">Sign Up</button>
          <Link to="/loginpage">
            <button type="button">Login</button>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default SignUp;

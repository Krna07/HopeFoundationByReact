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

  const onSubmit = async (data) => {
    console.log("Submitting:", data);

    try {
      const res = await fetch(`${API_URL}/logged`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log("Response:", response);

      if (res.ok) {
        alert("Signup successful!");
        reset();
        navigate("/loginpage");
      } else {
        alert(response.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="formbody">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* ✅ Role Select at Bottom */}
        <div className="form-group">
          <label>Select Account Type:</label>
          <div className="role-options"> 
            
            {/* Donor */}
            <div>
              <input
                type="radio"
                id="role-donor"
                value="Donor"
                {...register("role", { required: "Select a role" })}
              />
              <label htmlFor="role-donor">Donor</label>
            </div>

            {/* Needy - Redirect */}
            <div>
              <input
                type="radio"
                id="role-needy"
                value="Needy"
                {...register("role", { required: "Select a role" })}
                onChange={() => navigate("/needy_sign")} // ✅ redirect
              />
              <label htmlFor="role-needy">Needy</label>
            </div>

          </div>
          {errors.role && <p className="error">{errors.role.message}</p>}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit">Sign Up as Donor</button>

          <Link to="/loginpage">
            <button type="button">Login</button>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default SignUp;

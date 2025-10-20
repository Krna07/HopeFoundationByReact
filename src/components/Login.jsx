import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  // ✅ Load API base URL from environment variable (Vite style)
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("Updated Data:", userData);
  }, [userData]);

  const LoginData = async (data) => {
    console.log("From Form:", data);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log("Response:", response);

      reset();

      if (response.message === "Login successful!") {
        // ✅ Store user info globally if needed
        setUserData(response);

        // ✅ Navigate to user dashboard
        navigate(`/dash/${response?.data?._id}`);
      } else {
        alert(response.message || "Invalid credentials!");
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className='loginpage'>
      <form onSubmit={handleSubmit(LoginData)}>
        
        {/* Email */}
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <br />

        {/* Password */}
        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is necessary" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;

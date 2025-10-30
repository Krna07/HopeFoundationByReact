import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "./login.css";
import { useNavigate,Link } from 'react-router-dom';
import { UserContext } from './UserProvider';
import axios from 'axios'; // ✅ Add
const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("Updated Data:", userData);
  }, [userData]);

  // const LoginData = async (data) => {
  //   console.log("From Form:", data);
  //   try {
  //     const response = await axios.post(`${API_URL}/login`, data);

  //     console.log("Response:", response.data);
  //     reset();

  //     if (response.data.message === "Login successful!") {
  //       //  Store user info globally if needed
  //       setUserData(response.data);

  //       //  Navigate to user dashboard
  //       navigate(`/dash/${response.data?.data?._id}`);
  //     } else {
  //       alert(response.data.message || "Invalid credentials!");
  //     }

  //   } catch (err) {
  //     console.error("Error:", err);
  //     alert(err.response?.data?.message || "Failed to connect to the server. Please try again later.");
  //   }
  // };



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

    if (res.ok && response.message === "Login successful!") {
      // ✅ Save token
      localStorage.setItem("token", response.token);
      console.log("Token:", response.token);

      // ✅ Update context
      setUserData(response);

      // ✅ Navigate to dashboard
      console.log("Navigating to:", `/dash/${response.data._id}`);
      navigate(`/dash/${response.data._id}`);
    } else {
      alert(response.error || response.message || "Invalid credentials!");
    }

    reset();
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
        <Link to="/needy"><button>Login as Needy</button></Link>
      </form>
    </div>
  );
};

export default Login;

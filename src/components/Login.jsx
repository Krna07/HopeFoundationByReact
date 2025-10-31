import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserProvider';
import axios from 'axios'; // ✅ Add (as in original)

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  // No logic change: using the exact destructuring you provided
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log("Updated Data:", userData);
  }, [userData]);

  // --- No Logic Change: This function is identical ---
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
  
  // --- Start of UI Refactor ---
  return (
    <div className='loginpage min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4'>
      
      <form 
        onSubmit={handleSubmit(LoginData)}
        className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6"
        noValidate // Disable browser validation, let react-hook-form handle it
      >
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Login to your Hope Foundation account.
          </p>
        </div>
        
        {/* Email */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 ring-red-500' // Error state
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500' // Normal state
            } dark:bg-gray-700 dark:text-white`}
            {...register("email", { required: "Email is required" })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 ring-red-500' // Error state
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500' // Normal state
            } dark:bg-gray-700 dark:text-white`}
            {...register("password", { required: "Password is necessary" })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button 
            type='submit' 
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
          
          <Link to="/needy" className="block">
            {/* Added type="button" to prevent form submission */}
            <button 
              type="button" 
              className="w-full py-3 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Login as Needy
            </button>
          </Link>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}

          <Link 
            to="/SignUp" 
            className="font-medium text-blue-600 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Sign Up
          </Link>
          <br /><br />
          <b>Demo Credentials</b><br />
          <span><i>Email: yashir@gmail.com</i></span><br />
          <span><i>Password: 1234567890</i></span>
        </p>
      </form>
    </div>
  );
};

export default Login;
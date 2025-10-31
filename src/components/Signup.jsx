import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  
  // --- No Logic Change: Identical to original ---
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
  // --- End of Unchanged Logic ---

  return (
    <div className="formbody min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="login-form max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6"
        noValidate
      >
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join Hope Foundation to make a difference.
          </p>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input id="name" type="text"
            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-500 ring-red-500' // Error state
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500' // Normal state
            } dark:bg-gray-700 dark:text-white`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input id="email" type="email"
            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input id="password" type="password"
            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password
                ? 'border-red-500 ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
            } dark:bg-gray-700 dark:text-white`}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Account Type:
          </label>
          <fieldset className="mt-2">
            <legend className="sr-only">Account Type</legend>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Donor Option */}
              <div>
                <input
                  type="radio"
                  id="role-donor"
                  value="Donor"
                  className="sr-only peer"
                  {...register("role", { required: "Select a role" })}
                />
                <label
                  htmlFor="role-donor"
                  className="w-full p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer flex items-center justify-center text-sm font-medium
                             peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-colors"
                >
                  Donor
                </label>
              </div>

              {/* Needy Option */}
              <div>
                <input
                  type="radio"
                  id="role-needy"
                  value="Needy"
                  className="sr-only peer"
                  {...register("role", { required: "Select a role" })}
                  // No Logic Change: This onChange redirect is preserved
                  onChange={() => navigate("/needy_sign")} 
                />
                <label
                  htmlFor="role-needy"
                  className="w-full p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer flex items-center justify-center text-sm font-medium
                             peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-colors"
                >
                  Needy
                </label>
              </div>

            </div>
            {errors.role && <p className="error mt-1 text-sm text-red-500">{errors.role.message}</p>}
          </fieldset>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign Up as Donor
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link 
            to="/loginpage" 
            className="font-medium text-blue-600 hover:text-blue-500 dark:hover:text-blue-400"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default SignUp;
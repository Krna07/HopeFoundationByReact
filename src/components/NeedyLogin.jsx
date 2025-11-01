import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "./UserProvider.jsx";

const NeedyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const {userData, setUserData} = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }} = useForm();

  const API_URL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/needylogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role: "Needy" }) // force role needy
      });

      const out = await res.json();
      setUserData(out);
      

      if (!res.ok) {
        setErrorMsg(out.message || "Invalid Credentials");
      } else {
        localStorage.setItem("token", out.token);
        navigate("/needy-dashboard");
      }
    } catch {
      setErrorMsg("Server error! Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-50 px-4">
      
      <form
        className="w-full max-w-md bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
          Needy Login
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Login to request help and support
        </p>

        {errorMsg && (
          <p className="mb-3 bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
            {errorMsg}
          </p>
        )}

        {/* Email */}
        <label className="font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full mt-1 mb-2 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>}

        {/* Password */}
        <label className="font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password required" })}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter password"
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex justify-center items-center"
        >
          {isLoading && <AiOutlineLoading3Quarters className="animate-spin mr-2" />}
          Login
        </button>

        {/* Extra Links */}
        <p className="text-sm text-center mt-4 text-gray-600">
          New to Hope Foundation?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Create account
          </Link>
        </p>

        <p className="text-xs text-center text-gray-500 mt-2">
          *Needy login only — donors use donor login page <br />
           Demo Login Credentials: <br />
          <b>
            <i>
              Email:bhargavi@gmail.com <br />
              Password: 1234567890
            </i>
          </b>
        </p>
      </form>
    </div>
  );
};

export default NeedyLogin;

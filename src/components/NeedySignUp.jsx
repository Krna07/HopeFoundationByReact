import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const NeedySignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/needy-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (res.ok) {
        alert("Needy Registration Successful! Pending Verification.");
        reset();
        navigate("/loginpage");
      } else {
        alert(response.error || "Registration Failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error, try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Needy Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block font-medium">Full Name</label>
            <input 
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              {...register("phone", { required: "Phone is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Income */}
          <div>
            <label className="block font-medium">Monthly Income (₹)</label>
            <input
              type="number"
              {...register("income", { required: "Income is required" })}
              className="w-full border p-2 rounded"
              placeholder="e.g. 5000"
            />
            {errors.income && <p className="text-red-500 text-sm">{errors.income.message}</p>}
          </div>

          {/* Story */}
          <div>
            <label className="block font-medium">Your Story</label>
            <textarea
              {...register("story", { required: "Story is required" })}
              className="w-full border p-2 rounded"
              rows="4"
              placeholder="Describe why you need help..."
            ></textarea>
            {errors.story && <p className="text-red-500 text-sm">{errors.story.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full border p-2 rounded"
              placeholder="e.g. Mumbai, India"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Register as Needy
          </button>
        </form>

        {/* ✅ Option to choose type */}
        <p className="text-center text-sm mt-4">
          Want to help instead?
          <button 
            onClick={() => navigate("/donor-register")}
            className="text-blue-600 font-semibold ml-1"
          >
            Register as Donor
          </button>
        </p>

        <p className="text-center text-sm mt-2">
          Already a user?  
          <button 
            onClick={() => navigate("/loginpage")}
            className="text-blue-600 font-semibold ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default NeedySignUp;

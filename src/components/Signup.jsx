import React from 'react'
import { useForm } from "react-hook-form";
import "./sign.css"
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate()
  const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();

  const Alldata = async(data) => {
    
    console.log("Submission on the way.....", data);
    // localStorage.setItem("data",JSON.stringify(data))
    try {
      const res = await fetch("http://localhost:5000/logged",{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify(data), // send form data
      });
      const response = await res.json();
      console.log("Data:", response);
      reset()
      if(response.message == "User logged successfully"){
        navigate('/loginpage')
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  let nameErrorMessage;
  if (errors.name) {
    nameErrorMessage = <p className="error">{errors.name.message}</p>;
  } else {
    nameErrorMessage = null; // nothing
  }



// errors = {
//   name: {
//     type: "required",
//     message: "Name is required"
//   }
// }


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
        {nameErrorMessage}
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

      {/* Submit Button */}
      <button type="submit">SignUp</button>
      <Link to="/loginpage"><button>Login</button></Link>
    </form>
    </div>
  );
}

export default SignUp;
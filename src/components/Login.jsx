import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import "./login.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';



const Login = () => {

    const {userData , setUserData} = useContext(UserContext)
      const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();

    useEffect(()=>{
      console.log("Updated Data :",userData);
    },[userData])

    const navigate = useNavigate()

    const LoginData= async(data)=>{
      console.log("from Form",data)
        try {
        const res = await fetch("http://localhost:5000/login",{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
            body: JSON.stringify(data), // send form data
        });
        const response = await res.json();
        // console.log("Data:", response);
        reset()
      if(response.message == "Login successful!"){
        setUserData(response)
        navigate(`/${response.userId}`)
      
      }
        }catch(err){
            console.error("Error:", err);
        }
    }
  return (
    <div className='loginpage'>
            <form action="" onSubmit={handleSubmit(LoginData)}>

                <div className="email">
                    <label htmlFor="">Email:</label>
                    <input type="email" name="email" id="" {...register("email",{required:"Email is required"})} />
                    {errors.email && <p>{errors.email.message}</p> }
                </div>
                <br />  
                <div className="password">
                    <label htmlFor="">Password:</label>
                    <input type="password" name="" id="" {...register("password" , {required:"Password is Neccessary"})} />
                    {errors.password && <p>{errors.password.message}</p> }
                </div>

                <button type='submit'>Login</button>
                 
            </form>
    </div>
  )
}

export default Login
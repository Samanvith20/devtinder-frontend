import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    const toastLoading=toast.loading("Logging in...")
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
        console.log("data",data)
        toast.success("Login Successful",{id:toastLoading})
        dispatch(addUser(data.user))
        navigate("/")
        
      if (!response.ok) {
        toast.error(data.message || "Login Failed",{id:toastLoading})

        throw new Error(data.message || "Login failed");
        
      }
      

      console.log("Login Successful:", data);
    } catch (error) {
      if(error.message.includes("Unauthorized") || error.message.includes("Login failed")){
        toast.error(error.message || "Login Failed",{id:toastLoading})
        navigate("/login")
      }
     
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen m-auto  bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg font-mono">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <Toaster/>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              placeholder="Enter your email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              placeholder="Enter your password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm">New here? </span>
          <a href="/signup" className="text-sm text-blue-500 font-bold hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    const backendUrl = "http://localhost:3000";
    const toastLoading=toast.loading("Signing up...")

    try {
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
       console.log("data",data)
       toast.success("Signup Successful",{id:toastLoading})
          navigate("/login")
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Signup Successful:", data);
    } catch (error) {
      toast.error(error.message || "Signup Failed",{id:toastLoading})
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg font-mono">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
             <Toaster />
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              placeholder="Enter your name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              placeholder="Enter your email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              placeholder="Enter your password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
              placeholder="Enter your age"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <span className="text-sm">Already have an account? </span>
          <a href="login" className="text-sm text-blue-500 font-bold hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

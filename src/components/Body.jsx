import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const authMiddleware = async () => {
    try {
      // ✅ Check if a token exists in cookies
      const token = document.cookie.split("; ").find(row => row.startsWith("token="));
      
      if (!token) {
        console.warn("No token found, redirecting to login/signup");
        navigate("/login"); // ✅ Redirect to Login if no token
        return;
      }

      // ✅ Fetch user details from backend
      const response = await fetch("http://localhost:3000/api/profile/view/profile", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      // ✅ Store user in Redux if valid
      if (data.user) {
        dispatch(addUser(data.user));
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      navigate("/login"); // ✅ Redirect on auth failure
    }
  };

  useEffect(() => {
    if (!user || !user._id) authMiddleware();
  }, [user]); // ✅ Runs when user is missing

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

import { Outlet } from "react-router-dom"; // ✅ Corrected import
import Navbar from "./Navbar";
import Footer from "./footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/UserSlice";

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const authMiddleware = async () => {
    if (user) return;
    try {
      const response = await fetch("http://localhost:3000/api/profile/view/profile", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      dispatch(addUser(data.user));
    } catch (error) {
      if (error.message === "Authentication failed") {
        navigate("/login");
      }
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (!user) authMiddleware();
  }, [user]); // ✅ Added user as a dependency

  return (
    <div>
      <Navbar />
      <Outlet /> {/* ✅ This allows nested routes to render inside Body */}
      <Footer />
    </div>
  );
};

export default Body;

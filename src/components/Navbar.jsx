import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/UserSlice";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      // Send a request to the server to log out
      fetch(`http://localhost:3000/api/auth/logout`, {
       
        credentials: "include",
      });
      // console.log("response",response)
     
    
      dispatch(addUser(null));
      navigate("/login");
     
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <nav className="w-full py-3 px-6 flex justify-between items-center bg-gray-100">
      {/* App Name */}
      <div className="text-xl font-bold text-gray-800">
        <Link to="/">Devtinder</Link>
     
        </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-gray-800">Welcome {user.name}</span>

          {/* User Profile */}
          <div className="relative">
            <img
              src={user.profilePic}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                <ul className="py-2">
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false); // Close dropdown
                    }}
                  >
                    Profile
                  </li>
                  <li 
                  onClick={()=>{
                    navigate("/connections")
                    setDropdownOpen(false)
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Connections
                    </li>
                    <li 
                  onClick={()=>{
                    navigate("/requests")
                    setDropdownOpen(false)
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                    Request
                    </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false); // Close dropdown
                    }}
                    
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;

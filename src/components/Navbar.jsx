import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <nav className="w-full py-3 px-6 flex justify-between items-center bg-gray-100">
      {/* App Name */}
      <div className="text-xl font-bold text-gray-800">Devtinder</div>

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
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">Profile</li>
                  <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">Settings</li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => console.log("Logout function here")}
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

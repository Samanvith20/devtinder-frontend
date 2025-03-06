import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className=" w-full py-3  bg-[re  px-6 flex justify-between items-center">
      {/* App Name */}
      <div className="text-xl font-bold text-gray-800">Devtinder</div>

      {/* User Profile */}
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWX_PdsX7vzhzp5FvqgWGFPjmbNJdLfkSFsKUburV4byAyIK4s9wYLAgE&s"
          alt="User"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40   rounded-md">
            <ul className="py-2">
              <li className="px-4 py-2  cursor-pointer">Profile</li>
              <li className="px-4 py-2  cursor-pointer">Settings</li>
              <li className="px-4 py-2  cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Topbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 shadow-md">
      {/* Desktop & Tablet View */}
      <div className="hidden md:flex justify-between items-center px-6 py-3">
        {/* Left Section - Hidden on Mobile */}
        <div className="hidden md:flex space-x-4 text-gray-700 text-sm">
          <a href="#" className="flex items-center">
            <i className="fas fa-map-marker-alt mr-2" style={{ color: "#00d084" }}></i> Find A Location
          </a>
          <a href="tel:+01234567890" className="flex items-center">
            <i className="fas fa-phone-alt mr-2" style={{ color: "#00d084" }}></i> +01234567890
          </a>
          <a href="mailto:example@gmail.com" className="flex items-center">
            <i className="fas fa-envelope mr-2" style={{ color: "#00d084" }}></i> example@gmail.com
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-700">
            <i className="fa fa-sign-in-alt mr-2" style={{ color: "#00d084" }}></i> Login Another Account?
          </Link>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <i className="fa fa-user mr-2" style={{ color: "#00d084" }}></i> My Dashboard
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  <i className="fas fa-user-alt mr-2" style={{ color: "#00d084" }}></i> My Profile
                </Link>
                <Link to="/history" className="block px-4 py-2 hover:bg-gray-100">
                  <i className="fas fa-exchange-alt mr-2" style={{ color: "#00d084" }}></i> Transactions
                </Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                  <i className="fas fa-bell mr-2" style={{ color: "#00d084" }}></i> Notifications
                </Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                  <i className="fas fa-cog mr-2" style={{ color: "#00d084" }}></i> Account Settings
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                  <i className="fas fa-power-off mr-2" style={{ color: "#00d084" }}></i> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        {/* Left: Only "User Panel" */}
        <span className="text-lg font-semibold text-gray-900">User Panel</span>

        {/* Right: Hamburger Menu */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" style={{ color: "#00d084" }} />
          ) : (
            <Bars3Icon className="h-6 w-6" style={{ color: "#00d084" }} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-3">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left text-gray-700 flex items-center justify-between"
          >
            <span>
              <i className="fa fa-user mr-2" style={{ color: "#00d084" }}></i> My Dashboard
            </span>
            <i className={`fas fa-chevron-${isDropdownOpen ? "up" : "down"} text-gray-600`}></i>
          </button>

          {isDropdownOpen && (
            <div className="ml-4 space-y-2">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                <i className="fas fa-user-alt mr-2" style={{ color: "#00d084" }}></i> My Profile
              </Link>
              <Link to="/history" className="block px-4 py-2 hover:bg-gray-100">
                <i className="fas fa-exchange-alt mr-2" style={{ color: "#00d084" }}></i> Transactions
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                <i className="fas fa-bell mr-2" style={{ color: "#00d084" }}></i> Notifications
              </Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">
                <i className="fas fa-cog mr-2" style={{ color: "#00d084" }}></i> Account Settings
              </Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                <i className="fas fa-power-off mr-2" style={{ color: "#00d084" }}></i> Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Topbar;

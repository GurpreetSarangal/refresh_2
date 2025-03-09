import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/image.png";

const ProfileManagement = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    return (
      storedUser || {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        password: "",
        profilePic: logo,
      }
    );
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({ ...user, profilePic: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    alert("Profile Updated Successfully!");

    // Navigate to Profile Page
    navigate("/profile");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Profile Management
        </h2>

        {/* Profile Picture Upload */}
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border border-gray-300"
          />
          <label className="absolute bottom-1 right-1 bg-[#00d084] p-2 rounded-full cursor-pointer">
            <CameraIcon className="h-5 w-5 text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </label>
        </div>

        {/* User Information Form */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00d084]"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00d084]"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#00d084]"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#00d084] text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
          >
            Save Changes
          </button>
        </div>

        {/* Back to Dashboard Link */}
        <div className="text-center mt-4">
          <Link to="/user-pannel" className="text-[#00d084] hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileManagement() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", phone: "", username: "" });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirmPass: "" });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/wallet/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          email: res.data.user.email,
          phone: res.data.user.phone_number || "",
          username: res.data.user.username || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch profile", err);
      }
    };
    fetchUser();
  }, []);

  const isStrongPassword = (pass) =>
    pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass);

  const handleSaveChanges = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/wallet/update-settings",
        { ...user },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "✅ Profile updated");
    } catch (err) {
      console.error("❌ Update failed", err);
      setMessage("❌ Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    const { current, newPass, confirmPass } = passwords;

    if (!current || !newPass || !confirmPass) return setMessage("❌ All password fields are required.");
    if (newPass !== confirmPass) return setMessage("❌ New passwords do not match.");
    if (!isStrongPassword(newPass))
      return setMessage("❌ Password must be 8+ chars, with uppercase, number, special char.");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/wallet/update-password",
        { currentPassword: current, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.forceLogout) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setMessage("✅ Password updated. Please log in again.");
    } catch (err) {
      setMessage("❌ Password update failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Profile Settings</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        <button
          onClick={handleSaveChanges}
          className="w-full border border-indigo-500 text-indigo-600 font-semibold py-2 rounded-md hover:bg-indigo-50 transition"
        >
          Save Profile
        </button>

        <hr className="border-t border-gray-300" />

        <h3 className="text-xl font-semibold text-center">Change Password</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={passwords.newPass}
            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <input
            type="password"
            value={passwords.confirmPass}
            onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="w-full border border-indigo-500 text-indigo-600 font-semibold py-2 rounded-md hover:bg-indigo-50 transition"
        >
          Change Password
        </button>

        {message && (
          <div className="mt-4 text-sm font-medium text-center text-red-600 whitespace-pre-wrap">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileManagement;

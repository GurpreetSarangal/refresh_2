import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileManagement() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    phone: "",
    username: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/wallet/settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          email: res.data.user.email,
          phone: res.data.user.phone || "",
          username: res.data.user.username || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch profile", err);
      }
    };
    fetchUser();
  }, []);

  const isStrongPassword = (pass) =>
    pass.length >= 8 &&
    /[A-Z]/.test(pass) &&
    /[0-9]/.test(pass) &&
    /[^A-Za-z0-9]/.test(pass);

  const handleSaveChanges = async () => {
    try {
      const res = await axios.post(
        "/api/wallet/update-setting",
        {
          email: user.email,
          phone: user.phone,
          username: user.username,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Profile updated successfully.");
    } catch (err) {
      console.error("❌ Update failed", err);
      setMessage("❌ Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    const { current, newPass, confirmPass } = passwords;

    if (!current || !newPass || !confirmPass) {
      return setMessage("❌ All password fields are required.");
    }

    if (newPass !== confirmPass) {
      return setMessage("❌ New passwords do not match.");
    }

    if (!isStrongPassword(newPass)) {
      return setMessage("❌ Password must be 8+ chars, with uppercase, number, special char.");
    }

    try {
      const res = await axios.post(
        "/api/wallet/update-setting",
        { currentPassword: current, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.forceLogout) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setMessage("✅ Password updated. Please log in again.");
    } catch (err) {
      console.error("❌ Password update error", err);
      setMessage("❌ Password update failed.");
    }
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Profile Settings</h2>

      <div>
        <label>Email:</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <button onClick={handleSaveChanges}>💾 Save Profile</button>

      <h3>🔐 Change Password</h3>
      <div>
        <label>Current Password:</label>
        <input
          type="password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={passwords.newPass}
          onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input
          type="password"
          value={passwords.confirmPass}
          onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
        />
      </div>
      <button onClick={handleChangePassword}>🔁 Change Password</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfileManagement;

const User = require("../models/user-model"); // Adjust path as needed

const updateUserSettings = async (req, res) => {
  try {
    const { email, phone, username } = req.body;
    const userId = req.user.userId; // Decoded from token by authMiddleware

    if (!email || !username) {
      return res.status(400).json({ message: "Username and email are required." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.email = email;
    user.phone_number = phone;
    user.username = username;

    await user.save();

    res.status(200).json({ message: "User settings updated successfully." });
  } catch (error) {
    console.error("Error updating user settings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = updateUserSettings;

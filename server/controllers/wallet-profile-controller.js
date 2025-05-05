const User = require("../models/user-model");

const infoProvider = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User ID received:", userId);

    // Exclude password and nested private_key fields in accounts
    const user = await User.findById(userId)
      .select("-password -accounts.private_key"); // ⛔ omit password and private_key

    if (!user) {
      return res.status(404).json({ detail: "User not found" });
    }

    console.log("User fetched:", user);
    res.status(200).json({
      user,
      message: "Protected profile data",
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
};

module.exports = infoProvider;

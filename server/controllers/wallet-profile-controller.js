const User = require("../models/user-model");
const { ethers } = require("ethers");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);

const infoProvider = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log("User ID received:", userId);

    // Exclude password and nested private_key fields in accounts
    const user = await User.findById(userId)
      .select("-password -accounts.private_key"); // ⛔ omit password and private_key

    if (!user) {
      return res.status(404).json({ detail: "User not found" });
    }

    const walletAddress = user.accounts[0].wallet_address;

    if (!walletAddress) {
      return res.status(404).json({ msg: "Wallet address not set" });
    }

    const balanceWei = await provider.getBalance(walletAddress);
    const balanceEth = ethers.formatEther(balanceWei);

    // return res.status(200).json();

    // console.log("User fetched:", user);
    res.status(200).json({
      user,
      wallet: {
        walletAddress,
        balance: balanceEth,
        unit: "ETH",
        network: "sepolia",
        balance_in_wei: balanceWei.toString(),
      },
      message: "Protected profile data",
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
};



const bcrypt = require("bcryptjs");

const updateUserSettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { email, phone, username, currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update general info
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (username) user.username = username;

    // Handle password change
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect current password" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      await user.save();
      return res.status(200).json({ msg: "Password updated", forceLogout: true });
    }

    await user.save();
    res.status(200).json({ msg: "User updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


module.exports = infoProvider, updateUserSettings;

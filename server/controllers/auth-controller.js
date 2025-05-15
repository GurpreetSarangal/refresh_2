const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { ethers } = require("ethers");

const ENCRYPTION_ALGORITHM = "aes-256-cbc";

// Utility function to encrypt private key
function encryptPrivateKey(privateKey, password) {
  const key = crypto.scryptSync(password, "salt", 32); // Derive key
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let encrypted = cipher.update(privateKey, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedPrivateKey: encrypted,
    iv: iv.toString("hex"),
  };
}

// Home Route
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error("❌ Error in Home Route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register Route
const register = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    if (!username || !email || !password || !phone_number) {
      return res.status(422).json({
        status: 422,
        message: "Fill the input properly",
        extraDetails: "All fields including phone number are required",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const walletPrivateKey = wallet.privateKey;

    const { encryptedPrivateKey, iv } = encryptPrivateKey(walletPrivateKey, password);

    const newUser = new User({
      username,
      email,
      password,
      phone_number,
      accounts: [
        {
          wallet_address: walletAddress,
          private_key: `${encryptedPrivateKey}:${iv}`,
        },
      ],
    });

    await newUser.save();

    res.status(201).json({
      msg: "Registration successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error("❌ Error in Register:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Login Route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ message: "Email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await userExist.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "Login successful",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error("❌ Error in Login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -accounts.private_key");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error in getUserProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login, getUserProfile };

const { ethers } = require("ethers");
const User = require("../models/user-model");

// Load from .env or config
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID";

const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);

const getWalletBalance = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Explicitly select walletAddress since it's not excluded
    const user = await User.findById(userId).select("+walletPrivateKey");

    if (!user || !user.walletAddress) {
      return res.status(404).json({ msg: "Wallet not found for user" });
    }

    const balanceWei = await provider.getBalance(user.walletAddress);
    const balanceEth = ethers.formatEther(balanceWei);

    res.status(200).json({
      walletAddress: user.walletAddress,
      balance: balanceEth,
      unit: "ETH",
      network: "sepolia",
    });
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = getWalletBalance;

const { ethers } = require("ethers");
const User = require("../models/user-model");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);

const getWalletBalance = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Include accounts in selection
    const user = await User.findById(userId).select("accounts");

    if (!user || !user.accounts || user.accounts.length === 0) {
      return res.status(404).json({ msg: "No wallet found for user" });
    }

    const walletAddress = user.accounts[0].wallet_address;
    if (!walletAddress) {
      return res.status(404).json({ msg: "Wallet address not set" });
    }

    const balanceWei = await provider.getBalance(walletAddress);
    const balanceEth = ethers.formatEther(balanceWei);

    return res.status(200).json({
      walletAddress,
      balance: balanceEth,
      unit: "ETH",
      network: "sepolia",
      balance_in_wei: balanceWei.toString(),
    });

  } catch (error) {
    console.error("Error getting wallet balance:", error);
    return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = getWalletBalance;

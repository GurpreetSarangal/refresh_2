const axios = require("axios");
const User = require("../models/user-model");

const getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user's first wallet address
    const user = await User.findById(userId).select("accounts");
    if (!user || !user.accounts || user.accounts.length === 0) {
      return res.status(404).json({ message: "No wallet found for user" });
    }

    const walletAddress = user.accounts[0].wallet_address;

    // Query Etherscan API for Sepolia
    const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

    const response = await axios.get(url);
    const { data } = response;

    if (data.status !== "1") {
      return res.status(400).json({ message: "Failed to fetch transactions", error: data.message });
    }

    return res.status(200).json({
      walletAddress,
      transactions: data.result,
    });

  } catch (err) {
    console.error("❌ Error fetching transactions:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = getRecentTransactions;

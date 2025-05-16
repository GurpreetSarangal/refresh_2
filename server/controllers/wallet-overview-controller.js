const { ethers } = require("ethers");
const axios = require("axios");
const User = require("../models/user-model");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Utility: sleep function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility: retry wrapper for axios call
const fetchEthPriceWithRetry = async (retries = 5, delayMs = 500) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
          include_24hr_change: "true",
        },
      });
      return response.data.ethereum;
    } catch (err) {
      const isLastAttempt = attempt === retries - 1;
      if (isLastAttempt) throw err;
      console.warn(`Retrying CoinGecko fetch (${attempt + 1}/${retries})...`);
      await delay(delayMs * Math.pow(2, attempt)); // Exponential backoff
    }
  }
};

const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve user and wallet address
    const user = await User.findById(userId);
    if (!user || !user.accounts || user.accounts.length === 0) {
      return res.status(404).json({ message: "User wallet not found" });
    }

    const walletAddress = user.accounts[0].wallet_address;

    // Fetch ETH balance
    const balanceWei = await provider.getBalance(walletAddress);
    const balanceEth = parseFloat(ethers.formatEther(balanceWei));

    // Fetch ETH price and 24h change (with retry)
    const ethData = await fetchEthPriceWithRetry();
    const ethPriceUsd = ethData.usd;
    const eth24hChange = ethData.usd_24h_change;

    // Calculate portfolio value
    const portfolioValueUsd = balanceEth * ethPriceUsd;

    // Structure asset details
    const assets = [
      {
        currency: "sepolia_eth",
        amount_eth: balanceEth,
        amount_usd: portfolioValueUsd,
        price_usd: ethPriceUsd,
        change_24h_percent: eth24hChange,
      },
    ];
 
    // Respond with portfolio data
    res.status(200).json({
      total_value_usd: portfolioValueUsd,
      assets,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error.message || error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = getPortfolio;

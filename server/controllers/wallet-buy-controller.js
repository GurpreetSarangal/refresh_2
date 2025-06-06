const { ethers } = require("ethers");
const User = require("../models/user-model");
const axios = require("axios");

const getEthUsdPriceWithRetry = async (maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
        timeout: 5000,
      });

      return response.data.ethereum.usd;

    } catch (error) {
      console.warn(`Attempt ${attempt} failed to fetch ETH price. Retrying...`);

      if (attempt === maxRetries) {
        throw new Error("Failed to fetch live ETH price after multiple attempts.");
      }

      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

const buySepoliaETH = async (req, res) => {
  try {
    const { 
      amount, 
      fiat_currency, 
      crypto_currency, 
      ethUsdAtInitiation 
    } = req.body;
    const userId = req.user.userId;

    if (!amount || !fiat_currency || !crypto_currency || !ethUsdAtInitiation) {
      return res.status(400).json({ msg: "Amount, fiat currency, crypto currency, and current ETH price are required." });
    }

    if (crypto_currency.toLowerCase() !== "sepolia") {
      return res.status(400).json({ msg: "Only Sepolia ETH is supported at this time." });
    }

    const user = await User.findById(userId);
    if (!user || !user.accounts || user.accounts.length === 0) {
      return res.status(404).json({ msg: "User wallet not found." });
    }

    if (user.fiat_balance < amount) {
      return res.status(400).json({ msg: "Insufficient fiat balance." });
    }

    const recipientAddress = user.accounts[0].wallet_address;

    // Re-fetch live ETH price to check for fluctuations
    let liveEthUsdRate;
    try {
      liveEthUsdRate = await getEthUsdPriceWithRetry();
    } catch (err) {
      return res.status(503).json({
        message: "Unable to fetch live ETH price. Please try again later.",
        error: err.message,
      });
    }

    const fluctuation = Math.abs((liveEthUsdRate - ethUsdAtInitiation) / ethUsdAtInitiation) * 100;

    if (fluctuation > 1) {
      return res.status(409).json({
        msg: "ETH price changed by more than 1%. Transaction cancelled.",
        ethUsdAtInitiation,
        liveEthUsdRate,
        fluctuation: fluctuation.toFixed(2) + "%",
      });
    }

    const ethAmount = amount / liveEthUsdRate;

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const serverWallet = new ethers.Wallet(process.env.SERVER_PRIVATE_KEY, provider);

    const serverBalanceWei = await provider.getBalance(serverWallet.address);
    const serverBalanceEth = parseFloat(ethers.formatEther(serverBalanceWei));

    if (serverBalanceEth < ethAmount) {
      return res.status(400).json({ msg: "Server wallet has insufficient Sepolia ETH." });
    }

    const tx = await serverWallet.sendTransaction({
      to: recipientAddress,
      value: ethers.parseEther(ethAmount.toFixed(8)),
    });

    await tx.wait();

    user.fiat_balance -= amount;
    await user.save();

    res.status(200).json({
      msg: "Transaction successful",
      txHash: tx.hash,
      fiatSpent: amount,
      cryptoReceived: ethAmount,
      currency: fiat_currency,
      to: recipientAddress,
      ethUsdUsed: liveEthUsdRate,
    });

  } catch (error) {
    console.error("❌ Error in buySepoliaETH:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = buySepoliaETH;

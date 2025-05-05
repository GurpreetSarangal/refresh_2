const { ethers } = require("ethers");
const User = require("../models/user-model");

// Mock exchange rate (you can replace this with real-time oracle logic)
// const EXCHANGE_RATE = 0.0003; // $1 = 0.0003 Sepolia ETH

const axios = require("axios");

const getEthUsdPriceWithRetry = async (maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
        timeout: 5000, // Optional: timeout for slow response
      });

      const usdPrice = response.data.ethereum.usd;
      const exchangeRate = 1 / usdPrice;
      return exchangeRate;

    } catch (error) {
      console.warn(`Attempt ${attempt} failed to fetch ETH price. Retrying...`);

      if (attempt === maxRetries) {
        throw new Error("Failed to fetch live ETH price after multiple attempts.");
      }

      // Wait before retrying
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

// const getExchangeRate = async () => {
//     try {
//       const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
//         params: {
//           ids: "ethereum",
//           vs_currencies: "usd"
//         }
//       });
  
//       const usdPrice = response.data.ethereum.usd;
  
//       // Invert the rate to get how much ETH you get for $1
//       const exchangeRate = 1 / usdPrice;
  
//       return exchangeRate; // e.g., 0.00031 ETH for $1 if ETH is ~$3200
//     } catch (error) {
//       throw new Error("Failed to fetch exchange rate");
//     }
//   };

const buySepoliaETH = async (req, res) => {
  try {
    const { amount, fiat_currency, crypto_currency } = req.body;
    const userId = req.user.userId;

    if (!amount || !fiat_currency || !crypto_currency) {
      return res.status(400).json({ msg: "Amount, fiat currency, and crypto currency are required." });
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
    let ethUsdRate;
    try {
        ethUsdRate = await getEthUsdPriceWithRetry();
    } catch (err) {
        return res.status(503).json({
            message: "Unable to fetch exchange rate. Please try again later.",
            error: err.message,
        });
    }
    
    const ethAmount = amount * ethUsdRate;

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const serverWallet = new ethers.Wallet(process.env.SERVER_PRIVATE_KEY, provider);

    // Check server balance
    const serverBalanceWei = await provider.getBalance(serverWallet.address);
    const serverBalanceEth = parseFloat(ethers.formatEther(serverBalanceWei));

    if (serverBalanceEth < ethAmount) {
      return res.status(400).json({ msg: "Server wallet has insufficient Sepolia ETH." });
    }

    console.log(ethUsdRate)
    console.log(`${serverBalanceEth}<${ethAmount}=${serverBalanceEth<ethAmount}`)

    // Proceed with transaction
    const tx = await serverWallet.sendTransaction({
      to: recipientAddress,
      value: ethers.parseEther(ethAmount.toFixed(8))
    });

    await tx.wait();

    // Deduct fiat balance only after successful transaction
    user.fiat_balance -= amount;
    await user.save();

    res.status(200).json({
      msg: "Transaction successful",
      txHash: tx.hash,
      fiatSpent: amount,
      cryptoReceived: ethAmount,
      currency: fiat_currency,
      // crypto_currency,
      to: recipientAddress
    });

  } catch (error) {
    console.error("❌ Error in buySepoliaETH:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = buySepoliaETH;

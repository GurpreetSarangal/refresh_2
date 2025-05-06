const ethers = require("ethers");
const crypto = require("crypto");
const axios = require("axios");
const User = require("../models/user-model");

const fetchExchangeRateWithRetry = async (maxRetries = 3, delay = 1000) => {
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

const sellCrypto = async (req, res) => {
  const { amount, unit, crypto_currency, password, ethUsdAtInitiation } = req.body;

  if (!amount || !unit || !crypto_currency || !password || !ethUsdAtInitiation) {
    return res.status(400).json({ message: "All fields including ethUsdAtInitiation are required" });
  }

  if (crypto_currency.toLowerCase() !== "sepolia") {
    return res.status(400).json({ message: "Only Sepolia ETH is supported as of now" });
  }

  try {
    const user = await User.findById(req.user.userId).select("+accounts.private_key");
    if (!user || !user.accounts || user.accounts.length === 0) {
      return res.status(404).json({ message: "User wallet not found" });
    }

    const { wallet_address, private_key: storedEncryptedKey } = user.accounts[0];

    if (!storedEncryptedKey.includes(":")) {
      return res.status(500).json({ message: "Invalid encrypted private key format" });
    }

    const [encryptedPrivateKeyHex, ivHex] = storedEncryptedKey.split(":");
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decryptedPrivateKey = decipher.update(encryptedPrivateKeyHex, "hex", "utf8");
    decryptedPrivateKey += decipher.final("utf8");

    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const userWallet = new ethers.Wallet(decryptedPrivateKey, provider);

    const amountInWei = ethers.parseUnits(amount.toString(), unit);
    const amountInEth = parseFloat(ethers.formatEther(amountInWei));

    const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
    if (!serverWalletAddress) {
      return res.status(500).json({ message: "Server wallet address not configured" });
    }

    const balance = await provider.getBalance(userWallet.address);

    const gasLimit = await provider.estimateGas({
      to: serverWalletAddress,
      from: userWallet.address,
      value: amountInWei,
    });

    const feeData = await provider.getFeeData();
    const gasPrice = feeData.maxFeePerGas;

    const estimatedFee = gasLimit * gasPrice;
    const totalCost = amountInWei + estimatedFee;

    if (balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient balance. Transaction amount plus estimated gas fee exceeds wallet balance.",
        estimatedFee: ethers.formatEther(estimatedFee.toString()) + " ETH",
        balance: ethers.formatEther(balance.toString()) + " ETH",
        totalRequired: ethers.formatEther(totalCost.toString()) + " ETH",
      });
    }

    // Fetch live ETH price to compare with initial price
    const currentEthUsd = await fetchExchangeRateWithRetry();
    const priceFluctuation = Math.abs((currentEthUsd - ethUsdAtInitiation) / ethUsdAtInitiation) * 100;

    if (priceFluctuation > 1) {
      return res.status(409).json({
        message: "ETH price changed by more than 1%. Transaction cancelled.",
        initialPrice: ethUsdAtInitiation,
        currentPrice: currentEthUsd,
        fluctuation: priceFluctuation.toFixed(2) + "%",
      });
    }

    const fiatValueInUSD = amountInEth * currentEthUsd;

    const tx = await userWallet.sendTransaction({
      to: serverWalletAddress,
      value: amountInWei,
    });

    await tx.wait();

    user.fiat_balance += fiatValueInUSD;
    await user.save();

    res.status(200).json({
      message: "Sell transaction successful",
      txHash: tx.hash,
      usdReceived: fiatValueInUSD.toFixed(2),
    });
  } catch (err) {
    console.error("❌ Error in sellCrypto:", err.message);
    res.status(500).json({ message: "Sell failed", error: err.message });
  }
};

module.exports = sellCrypto;

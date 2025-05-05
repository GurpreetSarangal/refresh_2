const ethers = require("ethers"); // FIX: do not destructure
const crypto = require("crypto");
const axios = require("axios");
const User = require("../models/user-model");

const fetchExchangeRateWithRetry = async (maxRetries = 3, delay = 1000) => {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      return response.data.ethereum.usd; // USD per ETH
    } catch (err) {
      attempts++;
      if (attempts >= maxRetries) {
        throw new Error("Failed to fetch exchange rate after 3 attempts");
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const sellCrypto = async (req, res) => {
  const { amount, unit, crypto_currency, password } = req.body;

  if (!amount || !unit || !crypto_currency || !password) {
    return res.status(400).json({ message: "All fields are required" });
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

    // Check balance and estimate fee
    const balance = await provider.getBalance(userWallet.address);

    // Estimate gas limit
    const gasLimit = await provider.estimateGas({
      to: serverWalletAddress,
      from: userWallet.address,
      value: amountInWei,
    });

    // Get current gas price
    // const gasPrice = await provider.getGasPrice();
    const gasPrice = ((await provider.getFeeData()).maxFeePerGas);

    // Total estimated fee
    const estimatedFee = gasLimit * gasPrice;

    // Total cost = amount + fee
    const totalCost = amountInWei + estimatedFee;
    console.log("totalcost:    ", totalCost)
    console.log("balance:      ", balance)
    console.log("amountinwei:  ", amountInWei)
    console.log("estimatedFee: ", estimatedFee)
    console.log("gaslimit:     ", gasLimit)
    console.log("gasprice:     ", gasPrice)
    console.log("feeData:     ", await provider.getFeeData())

    if (balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient balance. Transaction amount plus estimated gas fee exceeds wallet balance.",
        estimatedFee: ethers.formatEther(estimatedFee.toString()) + " ETH",
        balance: ethers.formatEther(balance.toString()) + " ETH",
        totalRequired: ethers.formatEther(totalCost.toString()) + " ETH",
      });
    }

    const exchangeRate = await fetchExchangeRateWithRetry();
    const fiatValueInUSD = amountInEth * exchangeRate;

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

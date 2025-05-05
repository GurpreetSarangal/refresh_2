const ethers = require("ethers");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const transferCrypto = async (req, res) => {
    const {
        amount,
        crypto_currency,
        receiver_wallet_address,
        password,
        unit = "wei",
    } = req.body;

    if (!amount || !crypto_currency || !receiver_wallet_address || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (crypto_currency.toLowerCase() !== "sepolia") {
        return res.status(400).json({ message: "Only Sepolia ETH is supported as of now" });
    }

    try {
        // Load user with password hash and encrypted private key
        const user = await User.findById(req.user.userId).select("+accounts.private_key +password");
        if (!user || !user.accounts || user.accounts.length === 0) {
            return res.status(404).json({ message: "User wallet not found" });
        }

        // Verify password against hash
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { wallet_address, private_key: storedEncryptedKey } = user.accounts[0];
        if (!storedEncryptedKey.includes(":")) {
            return res.status(500).json({ message: "Invalid encrypted private key format" });
        }

        const [encryptedKeyHex, ivHex] = storedEncryptedKey.split(":");
        const key = crypto.scryptSync(password, "salt", 32);
        const iv = Buffer.from(ivHex, "hex");

        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decryptedPrivateKey = decipher.update(encryptedKeyHex, "hex", "utf8");
        decryptedPrivateKey += decipher.final("utf8");

        // Setup ethers provider and wallet
        const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        const wallet = new ethers.Wallet(decryptedPrivateKey, provider);

        const amountInWei = ethers.parseUnits(amount.toString(), unit);

        // Check balance and estimate fee
        const balance = await provider.getBalance(wallet.address);

        // Estimate gas limit
        const gasLimit = await provider.estimateGas({
            to: receiver_wallet_address,
            from: wallet.address,
            value: amountInWei,
        });

        // Get current gas price
        // const gasPrice = await provider.getGasPrice();
        const gasPrice = ((await provider.getFeeData()).maxFeePerGas);

        // Total estimated fee
        const estimatedFee = gasLimit * gasPrice;

        // Total cost = amount + fee
        const totalCost = amountInWei + estimatedFee;
        console.log("totalcost:    ",totalCost)
        console.log("balance:      ",balance)
        console.log("amountinwei:  ",amountInWei)
        console.log("estimatedFee: ",estimatedFee)
        console.log("gaslimit:     ",gasLimit)
        console.log("gasprice:     ",gasPrice)
        console.log("feeData:     ",await provider.getFeeData())

        if (balance < totalCost) {
            return res.status(400).json({
                message: "Insufficient balance. Transaction amount plus estimated gas fee exceeds wallet balance.",
                estimatedFee: ethers.formatEther(estimatedFee.toString()) + " ETH",
                balance: ethers.formatEther(balance.toString()) + " ETH",
                totalRequired: ethers.formatEther(totalCost.toString()) + " ETH",
            });
        }

        // Send transaction
        const tx = await wallet.sendTransaction({
            to: receiver_wallet_address,
            value: amountInWei,
        });

        await tx.wait();

        return res.status(200).json({
            message: "Transfer successful",
            txHash: tx.hash,
            from: wallet.address,
            to: receiver_wallet_address,
            amount: amount.toString(),
            unit,
        });

    } catch (err) {
        console.error("❌ Error in transferCrypto:", err.message);
        return res.status(500).json({ message: "Transfer failed", error: err.message });
    }
};

module.exports = transferCrypto;

const User = require("../models/user-model");

const withdrawFiatBalance = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { withdrawAmount, bankDetails } = req.body;
    let wa = Number(withdrawAmount)
    // ✅ Basic validations
    if (typeof withdrawAmount !== "number" || withdrawAmount <= 0) {
      return res.status(400).json({ msg: "Withdrawal amount must be a positive number." });
    }

    if (!bankDetails || !bankDetails.accountNumber || !bankDetails.bankName) {
      return res.status(400).json({ msg: "Bank details are incomplete." });
    }

    // 🔍 Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    if (user.fiat_balance < withdrawAmount) {
      return res.status(400).json({ msg: "Insufficient balance." });
    }

    // 💸 Deduct balance
    user.fiat_balance -= withdrawAmount;
    await user.save();

    // 🏦 Simulate bank transfer (in real case, integrate with a payment gateway or banking API)
    const mockTransaction = {
      toBank: bankDetails.bankName,
      accountNumber: bankDetails.accountNumber,
      amount: withdrawAmount,
      status: "processed", // mock status
      transactionId: "TXN" + Date.now()
    };

    // ✅ Respond
    res.status(200).json({
      msg: "Withdrawal processed successfully.",
      new_balance: user.fiat_balance,
      transaction: mockTransaction,
    });

  } catch (error) {
    console.error("❌ Error in withdrawFiatBalance:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = withdrawFiatBalance;

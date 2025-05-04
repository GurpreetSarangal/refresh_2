const User = require("../models/user-model");

const addFiatBalance = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;
    n = Number(amount)

    if (typeof n !== "number" || n <= 0) {
      return res.status(400).json({ msg: "Amount must be a positive number." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    user.fiat_balance += n;
    await user.save();

    res.status(200).json({
      msg: "Fiat balance updated successfully.",
      new_balance: user.fiat_balance,
    });

  } catch (error) {
    console.error("❌ Error in addFiatBalance:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = addFiatBalance;
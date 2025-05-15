const mongoose = require("mongoose");

const balanceHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referring to the User model, make sure it's present in your models
    required: true,
  },
  balanceType: {
    type: String,
    enum: ["fiat", "crypto"],
    required: true,
  },
  amountChange: {
    type: Number,
    required: true,
  },
  balanceAfterChange: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,  // E.g., 'USD', 'ETH'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BalanceHistory = mongoose.model("BalanceHistory", balanceHistorySchema);

module.exports = BalanceHistory;

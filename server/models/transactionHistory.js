const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referring to the User model, make sure it's present in your models
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["deposit", "withdrawal", "crypto_transfer", "buy", "sell"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,  // E.g., 'USD', 'ETH'
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
});

const TransactionHistory = mongoose.model("TransactionHistory", transactionSchema);

module.exports = TransactionHistory;

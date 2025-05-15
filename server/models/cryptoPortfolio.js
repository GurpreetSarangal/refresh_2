const mongoose = require("mongoose");

const cryptoPortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referring to the User model, make sure it's present in your models
    required: true,
  },
  coinName: {
    type: String,
    required: true,
  },
  coinSymbol: {
    type: String,
    required: true,  // E.g., 'BTC', 'ETH'
  },
  amount: {
    type: Number,
    default: 0,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const CryptoPortfolio = mongoose.model("CryptoPortfolio", cryptoPortfolioSchema);

module.exports = CryptoPortfolio;

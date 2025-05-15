const mongoose = require("mongoose");

const fiatBalanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referring to the User model, make sure it's present in your models
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "USD",  // You can adjust this if you want to support multiple fiat currencies
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const FiatBalance = mongoose.model("FiatBalance", fiatBalanceSchema);

module.exports = FiatBalance;

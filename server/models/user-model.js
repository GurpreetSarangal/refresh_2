const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define sub-schema for accounts array
const accountSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
    unique: true,
  },
  private_key: {
    type: String,
    required: true,
    select: false,
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fiat_balance: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  accounts: [accountSchema],
});

// 🔹 Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
  } catch (error) {
    next(error);
  }
});

// 🔹 Compare Password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// 🔹 Generate JWT Token
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      process.env.JWT_SECRET_KEY || "default_secret",
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.error("Error generating token", error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;

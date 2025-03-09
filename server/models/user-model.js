const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// 🔹 Hash Password Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
  } catch (error) {
    next(error);
  }
});

//compare the password
userSchema.methods.comparePassword = async function(password){
  return bcrypt.compare(password, this.password);

};



// 🔹 Generate JWT Token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY || "default_secret",
    { expiresIn: "30d" }
  );
};

// 🔹 Define and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;

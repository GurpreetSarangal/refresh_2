const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const { ethers } = require("ethers");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.error("❌ Error in Home Route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// const register = async (req, res) => {
//   try {
//     console.log("📩 Received Data:", req.body);

//     const { username, email, password } = req.body; 

//     if (!username || !email || !password) {
//       console.log("❌ Missing Fields:", { username, email, password });
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     console.log("🔍 Checking if user already exists...");
//     const userExist = await User.findOne({ email });

//     if (userExist) {
//       console.log("⚠️ Email already in use:", email);
//       return res.status(400).json({ msg: "Email already exists" });
//     }

//     console.log("🛠 Creating new user...");
//     const newUser = new User({
//       username, 
//       email,
//       password,
//     });

//     await newUser.save(); 

//     console.log("✅ User Created Successfully:", newUser);

//     res.status(201).json({
//       msg: "Registration successful",
//       token: await newUser.generateToken(),
//       userId: newUser._id.toString(),
//     });

//   } catch (error) {
//     console.error("❌ Error in Register:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // 🔐 Generate Sepolia Wallet (random mnemonic, securely)
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const walletPrivateKey = wallet.privateKey; // 🔥 DO NOT expose this in API response

    const newUser = new User({
      username,
      email,
      password,
      walletAddress,
      walletPrivateKey, // NOTE: optionally encrypt before saving
    });

    await newUser.save();

    res.status(201).json({
      msg: "Registration successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });

  } catch (error) {
    console.error("❌ Error in Register:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


//login logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    
    if (!userExist) {
     return res.status(400).json({message:"invalid Credentials"})
    }


    // const user = await bcrypt.compare(password, userExist.password);

    const user = await userExist.comparePassword(password);

    if(user){
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        // userId: userExist._id.toString(),

    });
  }else{
    res.status(401).json({message:"invalid Credentials"})

  }


  } catch (error) {
    res.status(500).json("internal server erro")
    
  }
}


// ✅ Export both functions
module.exports = { home, register,login };

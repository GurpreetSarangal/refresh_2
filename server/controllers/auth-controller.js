const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
    const { username, email, password, phone_number } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // 🔐 Create new Ethereum wallet
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const walletPrivateKey = wallet.privateKey;

    // 🔐 Encrypt private key using user's password
    // const cipher = crypto.createCipher("aes-256-cbc", password);
    // let encryptedPrivateKey = cipher.update(walletPrivateKey, "utf8", "hex");
    // encryptedPrivateKey += cipher.final("hex");

    const { encryptedPrivateKey, iv } = encryptPrivateKey(walletPrivateKey, password);

    // 🛠 Create new user with wallet account
    const newUser = new User({
      username,
      email,
      password,
      phone_number,
      accounts: [
        {
          wallet_address: walletAddress,
          private_key: encryptedPrivateKey + ":" + iv,
        },
      ],
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



const ENCRYPTION_ALGORITHM = "aes-256-cbc";

function encryptPrivateKey(privateKey, password) {
  const key = crypto.scryptSync(password, "salt", 32); // derive key
  const iv = crypto.randomBytes(16); // initialization vector
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let encrypted = cipher.update(privateKey, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedPrivateKey: encrypted,
    iv: iv.toString("hex"),
  };
}

// Logout Logic
const logout = async (req, res) => {
  try {
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("❌ Error in Logout:", error);
    return res.status(500).json({ message: "Server error during logout" });
  }
};



// fetch data from database
// const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // --- Fetch wallet data using `fetch` ---
//     let walletData = {};
//     try {
//       if (user.walletAddress) {
//         const response = await fetch(`https://api.getlock.io/wallet/${user.walletAddress}`);
//         if (response.ok) {
//           walletData = await response.json();
//         } else {
//           console.error("Wallet fetch failed with status:", response.status);
//         }
//       }
//     } catch (walletErr) {
//       console.error("Error fetching wallet data:", walletErr.message);
//     }

//     // --- Send user + wallet data ---
//     res.status(200).json({
//       user,
//       wallet: walletData,
//     });

//   } catch (error) {
//     console.error("Profile fetch error:", error.message);
//     res.status(500).json({ message: "Server error while fetching profile" });
//   }
// };

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    console.log("this runs");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let walletData = {};
    try {
      // Access wallet address from accounts array
      const walletAddress = user.accounts?.[0]?.wallet_address;

      if (walletAddress) {
        const response = await fetch(`https://api.getlock.io/wallet/${walletAddress}`);
        if (response.ok) {
          walletData = await response.json();
        } else {
          console.error("Wallet fetch failed with status:", response.status);
        }
      }
    } catch (walletErr) {
      console.error("Error fetching wallet data:", walletErr.message);
    }

    // Send both user data and wallet data
    res.status(200).json({
      user,
      wallet: walletData,
    });

  } catch (error) {
    console.error("Profile fetch error:", error.message);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};




const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    if (!username || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    await Contact.create({ username, email, message });
    res.status(201).json({ msg: "Message sent successfully" });

  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};







// ✅ Export both functions
module.exports = { home, register, login, getUserProfile, logout, contactForm };

 
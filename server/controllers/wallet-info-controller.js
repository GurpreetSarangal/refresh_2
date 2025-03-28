const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// Controller to get user info by userId
const infoProvider = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch user from the database
        // const user = await User.findById(userId);

        // if (!user) {
        //     return res.status(404).json({ detail: 'User  not found' });
        // }

        // Return user details
        // res.json({
        //     id: user._id,
        //     name: user.name,
        //     balance: user.balance,
        //     // Add any other user fields you want to return
        // });
            const response = req.body;
            console.log(response)
            res.status(200).json({ 
                name: 'aksdfjDoe',
                email: 'john.doe@example.com',
                phone: '+1 (555) 123-4567',
                imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
            });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ detail: 'Internal Server Error' });
    }
};

module.exports = infoProvider;
// const infoProvider = async (req, res) => {
//   try {
//     const response = req.body;
//     console.log(response.json())
//     res.status(200).json({ msg: "Welcome to our home page" });
//   } catch (error) {
//     console.error("❌ Error in Home Route:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const register = async (req, res) => {
//   try {
//     console.log("📩 Received Data:", req.body);

//     // 🔹 Ensure `user` is mapped to `username`
//     const { user, email, password } = req.body; 
//     const username = user || req.body.username; // ✅ Assign `user` to `username` if it exists

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
//       username, // ✅ Now properly assigned
//       email,
//       password,
//     });

//     await newUser.save(); // ✅ Ensure the user is saved

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



// //login logic

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const userExist = await User.findOne({ email });
    
//     if (!userExist) {
//      return res.status(400).json({message:"invalid Credentials"})
//     }


//     // const user = await bcrypt.compare(password, userExist.password);

//     const user = await userExist.comparePassword(password);

//     if(user){
//       res.status(200).json({
//         msg: "Login successful",
//         token: await userExist.generateToken(),
//         userId: userExist._id.toString(),

//     });
//   }else{
//     res.status(401).json({message:"invalid Credentials"})

//   }


//   } catch (error) {
//     res.status(500).json("internal server erro")
    
//   }
// }


// ✅ Export both functions
// module.exports = { infoProvider, register,login };
// module.exports = infoProvider;

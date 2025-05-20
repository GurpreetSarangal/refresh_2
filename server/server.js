const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Enable JSON and URL-encoded parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
app.use(cors({
  origin: "http://localhost:5173",  // allow frontend
  credentials: true, // only if you're using cookies or sessions
}));

//this is in 2023 now in this version we dont need this
//to store daat from front
// const corsOptions = {
//   origin: "http://localhost:5175",
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };


// app.use(cors(corsOptions));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));
require("./services/cryptoDataCron");

// Import Routes
const authRouter = require("./routes/auth-route");
const contactRouter = require("./routes/contact-router");
const walletRouter = require("./routes/wallet-router");
const cryptoDataRoute  = require("./routes/cryptoDataRoutes");



// Mount Routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter); // Assuming /contact route is defined inside contact-router
app.use("/api/wallet", walletRouter); // Assuming /contact route is defined inside contact-router

app.use("/api", cryptoDataRoute );


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

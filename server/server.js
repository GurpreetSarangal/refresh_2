const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middlewares/authMiddleware"); // JWT Auth Middleware

// Load environment variables
dotenv.config();

const app = express();

// ✅ Enable JSON and URL-encoded parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Import Routes
const authRouter = require("./routes/auth-route");
const contactRouter = require("./routes/contact-router");
const walletRouter = require("./routes/wallet-router");
const cryptoDataRoute = require("./routes/cryptoDataRoutes");

// Import Models (if required in other files)
const TransactionHistory = require("./models/transactionHistory");
const BalanceHistory = require("./models/balanceHistory");
const FiatBalance = require("./models/fiatBalance");
const CryptoPortfolio = require("./models/cryptoPortfolio");

// Middleware for JWT Authentication (for protected routes)
app.use("/api/wallet", authenticateToken); // Example of applying JWT middleware to a specific route

// Mount Routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter); // Assuming /contact route is defined inside contact-router
app.use("/api/wallet", walletRouter);
app.use("/api", cryptoDataRoute);

// Sample route to demonstrate authenticated access
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Global Error Handler (for any uncaught errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


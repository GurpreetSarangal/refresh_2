const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret"; // Default secret key if not provided in env

const authMiddleware = (req, res, next) => {
  try {
    // Extract authorization header
    const authHeader = req.headers.authorization;

    // Check if the header is valid and contains a Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY); // 🔥 Decoding token
    req.user = decoded; // Attach user info (userId) to request
    // req.user =  User.findById(decode.userId).select("-password");

    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);
    
    // Send a response with a 401 Unauthorized status if the token is invalid or expired
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
 
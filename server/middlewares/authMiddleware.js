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

    // Extract token from Bearer scheme
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach the decoded token payload (e.g., user information) to the request object
    req.user = decoded; 

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);
    
    // Send a response with a 401 Unauthorized status if the token is invalid or expired
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;

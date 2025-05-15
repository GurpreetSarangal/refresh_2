const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validators/auth-validator");
const authenticateToken = require("../middlewares/authMiddleware"); // ✅ import middleware

// Routes
router.route("/").post(authControllers.home);

router.route("/register")
  .post(validate(signupSchema), authControllers.register);

router.route("/login")
  .post(authControllers.login);

// ✅ Protected route to fetch user details after login
router.route("/user/profile")
  .get(authenticateToken, authControllers.getUserProfile);

module.exports = router;

const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/authMiddleware"); // or wherever it is


// Routes
router.route("/").post(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);
router.route("/profile").get(authMiddleware, authControllers.getUserProfile);


// ✅ Protected route to fetch user details after login
router.route("/user/profile")
  .get(authMiddleware, authControllers.getUserProfile);

module.exports = router;

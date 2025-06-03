const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware")
const signupSchema = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/authMiddleware"); // or wherever it is
const contactController = require("../controllers/auth-controller");
const { updatePasswordController } = require("../controllers/auth-update-password-controller");


// router.route("/profile").get(authMiddleware, authControllers.getUserProfile);

router.route("/").post(authControllers.home);
router.route("/register").post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);



// Contact form route
router.route("/contact").post(contactController.contactForm);
router.post('/update-password', authMiddleware, updatePasswordController);




module.exports = router; 
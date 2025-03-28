const express = require('express');
const router = express.Router();
const infoProvider = require("../controllers/wallet-info-controller");






// router.route("/info").all(infoProvider);
router.get("/info", infoProvider);

module.exports = router;
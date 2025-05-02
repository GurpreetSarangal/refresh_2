const express = require('express');
const router = express.Router();
const profileProvider = require("../controllers/wallet-profile-controller");
const authMiddleware = require('../middlewares/authMiddleware');







// Protected Routes
router.get('/overview', authMiddleware, profileProvider);
router.get('/profile', authMiddleware, profileProvider);
router.get('/balance', authMiddleware, profileProvider);
router.get('/recent', authMiddleware, profileProvider);
router.get('/settings', authMiddleware, profileProvider);
router.post('/add-funds', authMiddleware, profileProvider);
router.post('/withdraw', authMiddleware, profileProvider);
router.post('/buy', authMiddleware, profileProvider);
router.post('/swap', authMiddleware, profileProvider);
router.post('/transfer', authMiddleware, profileProvider);
router.post('/update-setting', authMiddleware, profileProvider);




module.exports = router;
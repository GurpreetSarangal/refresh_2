const express = require('express');
const router = express.Router();
const profileProvider = require("../controllers/wallet-profile-controller");
const authMiddleware = require('../middlewares/authMiddleware');
const getWalletBalance = require('../controllers/wallet-balance-controller');
const addFiatBalance = require('../controllers/wallet-add-funds-controller');
const withdrawFiatBalance = require('../controllers/wallet-withdraw-controller');
const buySepoliaETH = require('../controllers/wallet-buy-controller');
const transferCrypto = require('../controllers/wallet-transfer-controller');
const sellCrypto = require('../controllers/wallet-sell-controller');
const getRecentTransactions = require('../controllers/wallet-recent-controller');
const getPortfolio = require('../controllers/wallet-overview-controller');
const updateUserSettings = require('../controllers/wallet-update-settings-controller');
const { updatePasswordController } = require('../controllers/auth-update-password-controller');







// Protected Routes
router.get('/overview', authMiddleware, getPortfolio);
router.get('/profile', authMiddleware, profileProvider);
router.get('/balance', authMiddleware, getWalletBalance);
router.get('/recent', authMiddleware, getRecentTransactions);
router.get('/settings', authMiddleware, profileProvider);
router.post('/add-funds', authMiddleware, addFiatBalance);
router.post('/withdraw', authMiddleware, withdrawFiatBalance);
router.post('/buy', authMiddleware, buySepoliaETH);
router.post('/sell', authMiddleware, sellCrypto);
// router.post('/swap', authMiddleware, profileProvider);
router.post('/transfer', authMiddleware, transferCrypto);
router.post('/update-settings', authMiddleware, updateUserSettings);
router.post('/update-password', authMiddleware, updatePasswordController);
// router.post('/update-password', authMiddleware, updatePasswordController);

module.exports = router; 
 
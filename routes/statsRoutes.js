const express = require('express');
const statsController = require('../controllers/statsController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/dashboard', statsController.getDashboardStats);
router.get('/daily', statsController.getDailySales);

module.exports = router;

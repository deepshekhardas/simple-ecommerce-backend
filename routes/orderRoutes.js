const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);
router.get('/:id', orderController.getOrder);
router.get('/:id/invoice', orderController.downloadInvoice);

// Admin routes
router.use(restrictTo('admin'));
router.get('/', orderController.getAllOrders);
router.patch('/:id/status', orderController.updateStatus);

module.exports = router;

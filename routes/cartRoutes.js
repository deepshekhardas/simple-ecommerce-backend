const express = require('express');
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

router.use(protect); // All cart routes require login

router.get('/', cartController.getCart);
router.post('/add', validate(schemas.cartAdd), cartController.addItem);
router.patch('/item/:itemId', cartController.updateItem);
router.delete('/item/:itemId', cartController.removeItem);
router.delete('/', cartController.clearCart);
router.post('/apply-coupon', cartController.applyCoupon);

module.exports = router;

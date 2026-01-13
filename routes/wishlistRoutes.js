const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router
    .route('/')
    .get(wishlistController.getMyWishlist)
    .post(wishlistController.addToWishlist);

router
    .route('/:productId')
    .delete(wishlistController.removeFromWishlist);

module.exports = router;

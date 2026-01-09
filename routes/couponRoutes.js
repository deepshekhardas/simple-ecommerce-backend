const express = require('express');
const couponController = require('../controllers/couponController');
const { protect, restrictTo } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router
    .route('/')
    .get(couponController.getAllCoupons)
    .post(validate(schemas.couponCreate), couponController.createCoupon);

router.delete('/:id', couponController.deleteCoupon);

module.exports = router;

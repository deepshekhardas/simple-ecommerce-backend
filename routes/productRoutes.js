const express = require('express');
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router
    .route('/')
    .get(productController.getAllProducts)
    .post(
        protect,
        restrictTo('admin'),
        validate(schemas.productCreate),
        productController.createProduct
    );

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(protect, restrictTo('admin'), productController.updateProduct)
    .delete(protect, restrictTo('admin'), productController.deleteProduct);

module.exports = router;

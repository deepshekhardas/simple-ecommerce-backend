const productService = require('../services/productService');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
        status: 'success',
        data: { product },
    });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const { products, count, page, limit } = await productService.getProducts(req.query);
    res.status(200).json({
        status: 'success',
        results: products.length,
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        data: { products },
    });
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: { product },
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        data: { product },
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    await productService.deleteProduct(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

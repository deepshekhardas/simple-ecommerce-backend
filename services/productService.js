const Product = require('../models/Product');
const AppError = require('../utils/AppError');

exports.createProduct = async (productData) => {
    return await Product.create(productData);
};

exports.getProducts = async (query) => {
    // 1) Filtering
    const queryObj = { ...query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'minPrice', 'maxPrice', 'minRating'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering: gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let filter = JSON.parse(queryStr);

    // Text search
    if (query.search) {
        filter.$text = { $search: query.search };
    }

    // Price range filter
    if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }

    // Rating filter
    if (query.minRating) {
        filter.averageRating = { $gte: Number(query.minRating) };
    }

    let mongooseQuery = Product.find(filter);

    // 2) Sorting
    if (query.sort) {
        const sortBy = query.sort.split(',').join(' ');
        mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
        mongooseQuery = mongooseQuery.sort('-createdAt'); // Default: newest first
    }

    // 3) Pagination
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    mongooseQuery = mongooseQuery.skip(skip).limit(limit);

    // Execute
    const products = await mongooseQuery;
    const count = await Product.countDocuments(filter);

    return { products, count, page, limit };
};

exports.getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    return product;
};

exports.updateProduct = async (id, updateData) => {
    const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    return product;
};

exports.deleteProduct = async (id) => {
    // Soft delete
    const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    return product;
};

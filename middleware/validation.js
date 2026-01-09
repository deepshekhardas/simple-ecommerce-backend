const Joi = require('joi');
const AppError = require('../utils/AppError');

const validate = schema => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details
            .map(detail => detail.message)
            .join(', ');
        return next(new AppError(errorMessage, 400));
    }
    next();
};

// Common Schemas
const schemas = {
    signup: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().required(),
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    productCreate: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        sku: Joi.string().required(),
        category: Joi.string().required(),
        images: Joi.array().items(Joi.string()).min(1).required(),
        variants: Joi.array().items(
            Joi.object({
                size: Joi.string(),
                color: Joi.string(),
                stock: Joi.number().min(0),
            })
        ),
        stock: Joi.number().min(0),
    }),
    cartAdd: Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        variant: Joi.object({
            size: Joi.string(),
            color: Joi.string(),
        }),
    }),
    couponCreate: Joi.object({
        code: Joi.string().required(),
        discountType: Joi.string()
            .valid('percentage', 'fixed', 'free_shipping')
            .required(),
        value: Joi.number().required(),
        expiryDate: Joi.date().greater('now').required(),
        minOrderValue: Joi.number(),
        maxUses: Joi.number(),
    }),
};

module.exports = {
    validate,
    schemas,
};

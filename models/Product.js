const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
            index: true, // For search functionality
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: 0,
        },
        sku: {
            type: String,
            required: [true, 'Please add a SKU'],
            unique: true,
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            index: true, // For filtering
        },
        tags: [String],
        images: {
            type: [String],
            required: true,
        },
        variants: [
            {
                size: String,
                color: String,
                stock: {
                    type: Number,
                    default: 0,
                    min: 0,
                },
            },
        ],
        // Total stock is sum of variants, or standalone if no variants
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            select: false, // Soft delete implementation
        },
    },
    {
        timestamps: true,
    }
);

// Text index for search
productSchema.index({ name: 'text', description: 'text' });
// Pre-find hook to exclude soft-deleted products
productSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

module.exports = mongoose.model('Product', productSchema);

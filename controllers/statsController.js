const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');

exports.getDashboardStats = catchAsync(async (req, res, next) => {
    // 1. Total Orders
    const totalOrders = await Order.countDocuments();

    // 2. Total Sales
    const totalSalesAgg = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$total' }
            }
        }
    ]);
    const totalSales = totalSalesAgg.length > 0 ? totalSalesAgg[0].totalSales : 0;

    // 3. Total Users
    const totalUsers = await User.countDocuments();

    // 4. Total Products
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
        status: 'success',
        data: {
            totalOrders,
            totalSales,
            totalUsers,
            totalProducts
        }
    });
});

exports.getDailySales = catchAsync(async (req, res, next) => {
    const stats = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                sales: { $sum: '$total' },
                orders: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } },
        { $limit: 7 } // Last 7 days with activity
    ]);

    res.status(200).json({
        status: 'success',
        data: { stats }
    });
});

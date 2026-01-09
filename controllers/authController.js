const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await authService.register(req.body);

    // Send response
    res.status(201).json({
        status: 'success',
        token: accessToken,
        refreshToken,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(email, password);

    res.status(200).json({
        status: 'success',
        token: accessToken,
        refreshToken,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        },
    });
});

exports.refreshToken = catchAsync(async (req, res, next) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);

    res.status(200).json({
        status: 'success',
        token: result.accessToken,
    });
});

exports.logout = (req, res) => {
    // Since we are using stateless JWTs, "logout" is effectively checking blacklist (redis) or client-side removal.
    // For this project requirement, we just send a success message.
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    });
};

exports.getMe = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user,
        },
    });
});

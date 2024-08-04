const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHnadeler");
const catchAsyncError = require("./catchAsyncError");
const JWT = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    if (!req.headers) {
        return next(new ErrorHandler('Please Login to access this resource', 404));
    }
    const token  = req.headers.authorization.replace(/^Bearer\s+/i, '');
    
    if (!token) {
        return next(new ErrorHandler('Please Login to access this resource', 404));
    }
    if (!token) {
        return next(new ErrorHandler('Please Login to access this resource', 404));
    }

    try {
        const decodeData = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decodeData.id });

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid or expired token', 401));
    }
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};

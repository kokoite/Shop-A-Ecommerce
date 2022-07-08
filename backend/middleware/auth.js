const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require('./errorHandler')
const jwt = require('jsonwebtoken')
const User = require('../database/model/user')
exports.isAuthenticated = catchAsyncError(async(req,res,next) =>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler("Login to View this resource",401));
    const data = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(data.id);
    req.user = user;
    next();
})
exports.authorizeRole = (...roles)=>{
    return (req,res,next) =>{  
    const role = req.user.role;
    if(!roles.includes(role))
    {
        return next(new ErrorHandler(`Resource cannot access by ${role}`))
    }
    next();
}}
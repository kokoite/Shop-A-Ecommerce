const ErrorHandler = require('./errorHandler')
module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"
    if(err.name == "CastError")
    {
        const message = `Resource not found.Invalid ${err.path}`;
        err.message = message;
    }
    if(err.code == 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} found`
        err.message = message;
    }
    if(err.name == 'JsonWebTokenError')
    {
        const message = "Invalid JsonWebToken found,try again later";
        err.message = message;
    }
    if(err.name == 'TokenExpireError')
    {
        const message = "Token has been expired login again";
        err.message = message;
    }
    res.status(err.statusCode).json({success:false,message:err.message})
}

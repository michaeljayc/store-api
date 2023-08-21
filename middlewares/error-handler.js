const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    const customErrror = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong. Try again later."
    }
    
    if(err.name === "ValidationError") {
        customErrror.msg = Object.values(err.errors)
            .map( (value) => { 
                return value.message 
            })
            .join(', ');
        customErrror.statusCode = StatusCodes.BAD_REQUEST;
    }

    if(err.name === "CastError") {
        customErrror.msg = `Invalid ID provided. Please check correct ID format.`;
        customErrror.statusCode = StatusCodes.BAD_REQUEST;
    }
   
    if(err.code && err.code === 11000) {
        const value = Object.keys(err.keyValue);
        customErrror.msg = `${value} already exist. Choose another ${value}`;
        customErrror.statusCode = StatusCodes.BAD_REQUEST;
    }

    res.status(customErrror.statusCode).json({message: customErrror.msg});
}

module.exports = { errorHandlerMiddleware }
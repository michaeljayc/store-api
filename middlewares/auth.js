const UnauthenticatedError = require("../errors/unautheticated");
const ForbiddenError =  require("../errors/forbidden");
const { verifyJWT } = require('../utils')

const authenticationMiddleware = async (req,res,next) => {
    const token = req.signedCookies.token;
    if(!token) {
        throw new UnauthenticatedError("You need to login.")
    }

    try {
        const user = verifyJWT(token)
        req.user = {
            username: user.username,
            role: user.role
        };
        next();
    } catch(error) {
        throw new UnauthenticatedError("Authentication failed.")
    }
}

const authorizationMiddleware = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            throw new ForbiddenError('Current role unable to access this route.');
        }
        next();
    }
}


module.exports = {
    authenticationMiddleware,
    authorizationMiddleware
}
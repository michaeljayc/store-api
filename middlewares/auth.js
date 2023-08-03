require('dotenv').config();
const UnauthenticatedError  = require("../errors/unautheticated");
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Authentication error.");
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if(!decoded) {
        throw new UnauthenticatedError("Unauthorized to access route.");
    }
    req.user = {username: decoded.username};
    next();
}

module.exports = authenticationMiddleware;
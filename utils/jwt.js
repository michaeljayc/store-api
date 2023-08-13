require('dotenv').config();
const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    return jwt.sign(
        payload, 
        process.env.SECRET_TOKEN, 
        {expiresIn: process.env.TOKEN_LIFETIME});
}

const verifyJWT = (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN);
}

const attachCookieToResponse = (res,user) => {
    const token = createJWT(user);
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
}

const removeCookie = (res) => {
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now())
    })
}

module.exports = {
    createJWT,
    verifyJWT,
    attachCookieToResponse,
    removeCookie,
};
require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unautheticated");
const {attachCookieToResponse, removeCookie} = require('../utils')
const User = require('../models/user');

const register = async (req,res) => {    
    const result = await User.create(req.body);
    attachCookieToResponse(res,{
        username: result.username, 
        role: result.role 
    })

    res.status(StatusCodes.CREATED).json({
        message: "Registration successful!",
        user: {
            username: result.username,
            role: result.role
        },
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const result = await User.findOne({email});
    if(!result) {
        throw new UnauthorizedError("Invalid credentials.");
    }

    const isPasswordMatch = await result.comparePassword(password);
    if(!isPasswordMatch) {
        throw new UnauthorizedError("Incorrect password.");
    }

    attachCookieToResponse(res,{
        username: result.username, 
        role: result.role 
    })

    res.status(StatusCodes.OK).json({
        message: "Login successful!",
        user: {
            email: result.email,
            username: result.username,
            role: result.role
        }
    });
}

const logout = (req,res) => {
    removeCookie(res);
    res.status(StatusCodes.OK).json({
        message:"You are now logged out."
    })
}

module.exports = { register, login, logout };
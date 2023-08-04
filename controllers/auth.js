require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unautheticated");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req,res) => {
    const result = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({
        message: "Registration successful!",
        user: {
            username: result.username,
            role: result.role
        },
        token: await result.generateToken()
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequestError("Invalid email and password");
    }

    const result = await User.findOne({email});
    if(!result) {
        throw new UnauthorizedError("Invalid credentials.");
    }

    const isPasswordMatch = await result.comparePassword(password);
    if(!isPasswordMatch) {
        throw new UnauthorizedError("Incorrect password.");
    }

    const token = result.generateToken();
    res.status(StatusCodes.OK).json({
        message: "Login successful!",
        user: {
            email: result.email,
            username: result.username,
            role: result.role
        },
        token
    });
}

const dashboard = (req,res) => {
    const {username, role} = req.user;
    res.status(StatusCodes.OK).json({message:`Welcome, ${req.user.username}!`,user: {username, role}});
}

module.exports = { register, login, dashboard };
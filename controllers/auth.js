require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unautheticated");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');

const register = async (req,res) => {
    const role = await Role.findOne({_id:req.body.role});
    if(!role) {
        throw new BadRequestError(`Please provide correct role id.`);
    }
    
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

module.exports = { register, login };
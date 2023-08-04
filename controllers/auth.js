require('dotenv').config();
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require("../errors");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req,res) => {
    if(!req.body) {
        throw new BadRequestError("Provide fields required.");
    }
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({
        message: "Registration successful!",
        user
    });
}

const login = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        throw new BadRequestError("Invalid username and password");
    }

    const token = jwt.sign(
        {username},
        process.env.SECRET_TOKEN,
        {expiresIn:'1d'}
    );
    res.status(StatusCodes.OK).json({message: "login successful", token});
}

const dashboard = (req,res) => {
    res.status(StatusCodes.OK).json({message:`Welcome, ${req.user.username}!`});
}

module.exports = { register, login, dashboard };
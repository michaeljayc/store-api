require('dotenv').config();
const {BadRequestError} = require("../errors");
const jwt = require('jsonwebtoken');

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
    res.status(200).json({message: "login successful", token});
}

const dashboard = (req,res) => {
    res.status(200).json({message:`Welcome, ${req.user.username}!`});
}

module.exports = { login, dashboard };
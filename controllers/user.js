const User = require('../models/user');
const Role = require('../models/role');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const user = require('../models/user');

const getUser = async (req,res) => {
    const {id} = req.params;
    const user = await User.findOne({_id:id});
    if(!user) {
        throw new BadRequestError(`User with ID ${id} doesn't exist.`);
    }

    res.status(StatusCodes.OK).json({
        message:"success",
        user
    });
}

const getAllUsers = async (req,res) => {
    const {username} = req.query;
    const queryObj = {};

    if(username) {
        queryObj.username = {$regex:username, $options:'i'};
    }

    const users = await User.find(queryObj);
    res.status(200).json({
        message:"success",
        count: users.length,
        users
    })
}

const addUser = async (req,res) => {
    const {role:roleId} = req.body;
    const getRole = await Role.findOne({_id:roleId});
    // check if role exists
    if(!getRole) {
        throw new NotFoundError(`Role with ID ${roleId} does not exist.`);
    }
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({
        "message": "Successfully added user.",
        user
    })
}

const updateUser = async (req,res) => {
    const {id} = req.params;
    const user = await User.findOne({_id:id});
    if(!user) {
        throw new NotFoundError(`User with ID ${id} does not exist.`)
    }

    if(req.body.role) {
        const { role:roleId } = req.body
        //check if role.id exists
        const role = await Role.findOne({_id:roleId});
        if(!role) {
            throw new NotFoundError(`Role with ID ${roleId} does not exist.`);
        }
    }

    const result = await User.findOneAndUpdate({_id:id}, req.body, {new:true});
    res.status(StatusCodes.OK).json({
        message:"Successfully updated user.",
        user: result
    });
}

const deleteUser = async (req,res) => {
    const {id} = req.params;
    const user = await User.findOne({_id:id});
    if(!user) {
        throw new NotFoundError(`User with ID ${id} does not exist.`)
    }
    const result = await User.findOneAndDelete({_id:id});
    res.status(200).json({
        message:'Successfully deleted user.',
        user: result
    })
}

module.exports = {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}
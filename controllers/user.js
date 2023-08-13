const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const { getUserService, 
getUsersService,
createUserService,
updateUserService,
deleteUserService 
} = require('../services/user.service');

const userInfo = (req,res) => {
    res.status(StatusCodes.OK).json({
        message:"User information",
        user: req.user
    })
}
const getUser = async (req,res) => {
    const {id} = req.params;
    const user = await getUserService(id);
    if(!user) {
        throw new BadRequestError(`User with ID ${id} doesn't exist.`);
    }

    res.status(StatusCodes.OK).json({
        message:"success",
        user
    });
}

const getAllUsers = async (req,res) => {
    const users = await getUsersService(req.query);
    res.status(200).json({
        message:"success",
        count: users.length,
        users
    })
}

const addUser = async (req,res) => {
    const user = await createUserService(req.body);
    res.status(StatusCodes.CREATED).json({
        "message": "Successfully added user.",
        user
    })
}

const updateUser = async (req,res) => {
    const user = await getUserService(req.params.id);
    if(!user) {
        throw new NotFoundError(`User ID does not exist.`);
    }

    const result = await updateUserService(user._id, req.body);
    res.status(StatusCodes.OK).json({
        message:"Successfully updated user.",
        user: result
    });
}

const deleteUser = async (req,res) => {
    const user = await getUserService(req.params.id);
    if(!user) {
        throw new NotFoundError(`User ID does not exist.`)
    }
    const result = await deleteUserService(user._id);
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
    deleteUser,
    userInfo
}
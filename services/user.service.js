const User = require('../models/user');

const getUserService = async (userId) => {
    return await User.findOne({_id:userId});
}

const getUsersService = async (query) => {
    const {username, email, sort, fields} = query;
    const queryObj = {};

    if(username) {
        queryObj.username = {$regex:username, $options:'i'};
    }

    if(email) {
        queryObj.email = {$regex:email, $options: 'i'};
    }

    const result = User.find(queryObj);

    if(sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList);
    } else {
        result.sort('createdAt');
    }

    if(fields) {
        result.select(fields.split(',').join(' '));
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page-1) * limit;

    const users = await result.skip(skip).limit(limit);
    return users;
}

const createUserService = async (requestbod) => {
    return await User.create(requestbod);
}

const updateUserService = async (userId, requestbody) => {
    return await User.findOneAndUpdate({_id:userId}, requestbody, {new:true});
}

const deleteUserService = async (userId) => {
    return await User.findOneAndDelete({_id:userId});
}

module.exports = {
    getUserService,
    getUsersService,
    createUserService,
    updateUserService,
    deleteUserService
}
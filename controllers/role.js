const { StatusCodes } = require('http-status-codes');
const NotFoundError = require('../errors/not-found');
const Role = require('../models/role');

const getRole = async (req,res) => {
    const {id} = req.params;
    const role = await Role.findOne({_id:id})
    if(!role) {
        throw new NotFoundError(`Role with ID ${id} does not exist.`);
    }

    res.status(StatusCodes.OK).json({
        message:"success",
        role
    });
}

const getAllRoles = async (req,res) => {
    const {name, sort} = req.query;
    const query = {};
    
    if(name) {
        query.name = {$regex:name, $options:'i'}
    }

    let roles = Role.find(query);
    roles = sort ? roles.sort(sort) : roles.sort('createdAt');
    
    // add pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1) * limit;

    const role = await roles.skip(skip).limit(limit);
    res.status(StatusCodes.OK).json({
        message:"success",
        count: role.length,
        role
    });
}

const addRole = async (req,res) => {
    const role = await Role.create(req.body);
    res.status(StatusCodes.CREATED).json({
        message:"Successfully added role.",
        role
    });
}

const updateRole = async (req,res) => {
    const {id} = req.params;
    const result = await Role.findOne({_id:id});
    if(!result) {
        throw new NotFoundError(`Role with ID ${id} does not exist.`);
    }

    const role = await Role.findOneAndUpdate({_id:id}, req.body, {new:true});
    res.status(StatusCodes.OK).json({
        message:"Successfully updated role.",
        role
    })
}

const deleteRole = async (req,res) => {
    const {id} = req.params;
    const result = await Role.findOne({_id:id});
    if(!result) {
        throw new NotFoundError(`Role with ID ${id} does not exist.`);
    }

    const role = await Role.findOneAndDelete({_id:id});
    res.status(StatusCodes.OK).json({
        message:"Successfully deleted role.",
        role
    })
}

module.exports = {
    getRole,
    getAllRoles,
    addRole,
    updateRole,
    deleteRole
}
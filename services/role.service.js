const Role = require('../models/role');

const getRoleService = async (id) => {
    return await Role.findOne({_id:id});
}

const getRolesService = async (requestQuery) => {
    const {name, sort} = requestQuery;
    const query = {};
    
    if(name) {
        query.name = {$regex:name, $options:'i'}
    }

    let roles = Role.find(query);
    roles = sort ? roles.sort(sort) : roles.sort('createdAt');
    
    // add pagination
    const page = Number(requestQuery.page) || 1;
    const limit = Number(requestQuery.limit) || 10;
    const skip = (page-1) * limit;

    const role = await roles.skip(skip).limit(limit);
    return role;
}

const createRoleService = async (requestBody) => {
    return await Role.create(requestBody);
}

const updateRoleService = async (userId, requestBody) => {
    return await Role.findOneAndUpdate({_id:userId}, requestBody, {new:true});
}

const deleteRoleService = async (userId) => {
    return await Role.findOneAndDelete({_id:userId});
}

module.exports = {
    getRoleService,
    getRolesService,
    createRoleService,
    updateRoleService,
    deleteRoleService
}
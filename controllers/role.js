const { StatusCodes } = require('http-status-codes');
const NotFoundError = require('../errors/not-found');
const { getRoleService,
getRolesService,
createRoleService,
updateRoleService,
deleteRoleService
} = require('../services/role.service');

const getRole = async (req,res) => {
    const role = await getRoleService(req.params.id);
    if(!role) {
        throw new NotFoundError(`Role ID does not exist.`);
    }

    res.status(StatusCodes.OK).json({
        message:"success",
        role
    });
}

const getAllRoles = async (req,res) => {
    const roles = await getRolesService(req.query)
    res.status(StatusCodes.OK).json({
        message:"success",
        count: roles.length,
        roles
    });
}

const addRole = async (req,res) => {
    const role = await createRoleService(req.body);
    res.status(StatusCodes.CREATED).json({
        message:"Successfully added role.",
        role
    });
}

const updateRole = async (req,res) => {
    const result = await getRoleService(req.params.id);
    if(!result) {
        throw new NotFoundError(`Role ID does not exist.`);
    }

    const role = await updateRoleService(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
        message:"Successfully updated role.",
        role
    })
}

const deleteRole = async (req,res) => {
    const result = await getRoleService(req.params.id);
    if(!result) {
        throw new NotFoundError(`Role ID does not exist.`);
    }

    const role = await deleteRoleService(req.params.id);
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
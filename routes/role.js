const express = require('express');
const router = express.Router();
const {
    getRole,
    getAllRoles,
    addRole,
    updateRole,
    deleteRole
} = require('../controllers/role');

router.route('/').get(getAllRoles).post(addRole); 
router.route('/:id').get(getRole).patch(updateRole).delete(deleteRole);

module.exports = router;
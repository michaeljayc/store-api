const express = require('express');
const router = express.Router();
const {
    getRole,
    getAllRoles,
    addRole,
    updateRole,
    deleteRole
} = require('../controllers/role');

router.route('/').get(getAllRoles);
router.route('/:id').get(getRole);
router.route('/add').post(addRole);
router.route('/update/:id').patch(updateRole);
router.route('/delete/:id').delete(deleteRole);

module.exports = router;
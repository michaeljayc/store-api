const express = require('express');
const router = express.Router();
const {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
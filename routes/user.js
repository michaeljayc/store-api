const express = require('express');
const router = express.Router();
const {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);
router.route('/add').post(addUser);
router.route('/edit/:id').patch(updateUser);
router.route('/delete/:id').delete(deleteUser);

module.exports = router;
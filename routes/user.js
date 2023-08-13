const express = require('express');
const router = express.Router();
const {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    userInfo
} = require('../controllers/user');
const { 
    authenticationMiddleware, 
    authorizationMiddleware
} = require('../middlewares/auth');

router.route('/user').get(authenticationMiddleware, userInfo)
router.route('/')
    .get(authenticationMiddleware, authorizationMiddleware('admin'), getAllUsers)
    .post(authenticationMiddleware, authorizationMiddleware('admin'), addUser);
router.route('/:id')
    .get(authenticationMiddleware, authorizationMiddleware('admin'), getUser)
    .patch(authenticationMiddleware, authorizationMiddleware('admin'), updateUser)
    .delete(authenticationMiddleware, authorizationMiddleware('admin'), deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    authenticationMiddleware,
    authorizationMiddleware
} = require('../middlewares/auth');
const {
    getStore, 
    getAllStores,
    addStore,
    updateStore,
    deleteStore 
} = require('../controllers/store');

router.route('/')
    .get(authenticationMiddleware,authorizationMiddleware('admin'), getAllStores)
    .post(authenticationMiddleware,authorizationMiddleware('admin'), addStore);
router.route('/:id')
    .get(authenticationMiddleware,authorizationMiddleware('admin'), getStore)
    .patch(authenticationMiddleware,authorizationMiddleware('admin'), updateStore)
    .delete(authenticationMiddleware,authorizationMiddleware('admin'), deleteStore);

module.exports = router;
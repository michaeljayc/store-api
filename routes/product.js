const express = require('express');
const router = express.Router();
const {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');
const { 
    authenticationMiddleware, 
    authorizationMiddleware
} = require('../middlewares/auth');


router.route('/')
    .get(authenticationMiddleware, getProducts)
    .post(authenticationMiddleware, authorizationMiddleware('admin'), addProduct);
router.route('/:id')
    .get(authenticationMiddleware, authorizationMiddleware('admin'), getProduct)
    .patch(authenticationMiddleware, authorizationMiddleware('admin'), updateProduct)
    .delete(authenticationMiddleware, authorizationMiddleware('admin'), deleteProduct);

module.exports = router;
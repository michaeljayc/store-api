const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/auth');
const {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');


router.route('/?').get(authenticationMiddleware, getProducts);
router.route('/:id').get(authenticationMiddleware, getProduct);
router.route('/add').post(authenticationMiddleware, addProduct);
router.route('/update/:id').patch(authenticationMiddleware, updateProduct);
router.route('/delete/:id').delete(authenticationMiddleware, deleteProduct);

module.exports = router;
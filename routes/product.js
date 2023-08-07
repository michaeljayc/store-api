const express = require('express');
const router = express.Router();
const {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');


router.route('/').get(getProducts);
router.route('/:id').get(getProduct);
router.route('/add').post(addProduct);
router.route('/update/:id').patch(updateProduct);
router.route('/delete/:id').delete(deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');


router.route('/').get(getProducts).post(addProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
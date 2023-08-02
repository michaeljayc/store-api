const express = require('express');
const router = express.Router();
const {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');

router.get('/?', getProducts);
router.get('/:id', getProduct);
router.post('/add', addProduct);
router.patch('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
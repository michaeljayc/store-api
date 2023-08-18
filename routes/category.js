const express = require('express');
const router = express.Router();
const {
    authenticationMiddleware,
    authorizationMiddleware
} = require('../middlewares/auth');
const { 
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory 
} = require('../controllers/category');

router.route('/')
    .get(authenticationMiddleware, authorizationMiddleware('admin'), getCategories)
    .post(authenticationMiddleware, authorizationMiddleware('admin'), addCategory);
router.route('/:id')
    .get(authenticationMiddleware, authorizationMiddleware('admin'), getCategory)    
    .patch(authenticationMiddleware, authorizationMiddleware('admin'), updateCategory)
    .delete(authenticationMiddleware, authorizationMiddleware('admin'), deleteCategory);


module.exports = router;
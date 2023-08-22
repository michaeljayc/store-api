const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const {
    getCategoryService,
    getCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
} = require('../services/category.service');

const getCategory = async (req,res) => {
    const category = await getCategoryService(req.params.id);
    if(!category) {
        throw new BadRequestError('Category ID does not exist.');
    }
    res.status(StatusCodes.OK).json({
        message:"success",
        category
    });
}

const getCategories = async (req,res) => {
    const categories = await getCategoriesService(req.query);
    res.status(StatusCodes.OK).json({
        message:"success",
        count: categories.length,
        categories
    })
}

const addCategory = async (req,res) => {
    const category = await createCategoryService(req.body);
    res.status(StatusCodes.CREATED).json({
        message:"Category added successfully",
        category
    })
}

const updateCategory = async (req,res) => {
    const category = await getCategoryService(req.params.id);
    if(!category) {
        throw new BadRequestError('Category ID does not exist.');
    }
    const result = await updateCategoryService(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
        message:"Category updated successfully",
        category: result
    })
}

const deleteCategory = async (req,res) => {
    const category = await getCategoryService(req.params.id);
    if(!category) {
        throw new BadRequestError('Category ID does not exist.');
    }
    const result = await deleteCategoryService(req.params.id);
    res.status(StatusCodes.OK).json({
        message:"Category deleted successfully",
        category: result
    })
}

module.exports = {
    getCategory,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
}
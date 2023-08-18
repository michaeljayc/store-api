const Category = require('../models/category');

const getCategoryService = async (userId) => {
    return await Category.findOne({_id:userId});
}

const getCategoriesService = async (query) => {
    const { name,sort,fields } = query;
    const queryObj = {};

    if(name) {
        queryObj.name = {$regex:name, $options:'i'};
    }

    const result = Category.find(queryObj);
    console.log(result);
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList);
    } else {
        result.sort('createdAt');
    }

    if(fields) {
        result.select(fields.split(',').join(' '));
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page-1) * limit;

    const categories = await result.skip(skip).limit(limit);
    return categories;
}

const createCategoryService = async (requestBody) => {
    return await Category.create(requestBody);
}

const updateCategoryService = async (userId, requestBody) => {
    return await Category.findOneAndUpdate(
        {_id:userId},
        requestBody,
        {new:true}
    );
}

const deleteCategoryService = async (userId) => {
    return await Category.findOneAndDelete({_id:userId});
}

module.exports = {
    getCategoryService,
    getCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService
};


const Product = require('../models/product');

const getProductService = async (userId) => {
    return await Product.findOne({_id:userId});
}

const getProductsService = async (query) => {
    const { featured, name, sort, fields} = query;
    const queryObj = {};

    if(featured)
        queryObj.featured = featured === 'true' ? true : false;

    if(name)
        queryObj.name = { $regex:name, $options:'i' };

    const result = Product.find(queryObj)

    if(sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList);
    }

    if(fields) {
        result.select(fields.split(',').join(' '));
    }

    const page = Number(query.page ) || 1 ;
    const limit = Number(query.limit) || 10;
    const skip = (page-1) * limit;
    const products = await result.skip(skip).limit(limit);
    return products;
}

const createProductService = async (requestBody) => {
    return await Product.create(requestBody);
}

const updateProductService = async (userId, requestBody) => {
    return await Product.findOneAndUpdate({_id:userId}, requestBody, {new:true});
}

const deleteProductService = async (userId) => {
    return await Product.findOneAndDelete({_id:userId});
}

module.exports = {
    getProductService,
    getProductsService,
    createProductService,
    updateProductService,
    deleteProductService
}
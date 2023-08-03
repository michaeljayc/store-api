const Product = require('../models/product')
const BadRequestError = require('../errors/bad-request');
const {StatusCodes} = require('http-status-codes');

const getProduct = async (req,res) => {
    res.send('get product')
}

const getProducts = async (req,res) => {
    const { featured, company, name, sort, fields} = req.query;
    const queryObj = {};

    if(featured)
        queryObj.featured = featured === 'true' ? true : false;

    if(company)
        queryObj.company = company;

    if(name)
        queryObj.name = { $regex:name, $options:'i' };

    const result = Product.find(queryObj)

    if(sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList);
    } else {
        result.sort('createdAt');
    }

    if(fields) {
        result.select(fields.split(',').join(' '));
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1) * limit;
    const products = await result.skip(skip).limit(limit);
    res.status(StatusCodes.OK).json({
        message: "success",
        count: products.length, 
        data: { products },
    });
}

const addProduct = async (req,res) => {
    const addedProduct = await Product.create(req.body);
    res.status(StatusCodes.OK).json(
    { message: "Successfully added product.",
      data: addedProduct
    });
}

const updateProduct = async (req,res) => {
    const {id:productID} = req.params;
    const product = await Product.findOne({_id:productID});
    if(!product) {
        throw new BadRequestError(`Product with ID ${productID} not found.`);
    }

    const result = await Product
        .findOneAndUpdate(
            {_id:productID}, 
            req.body,
            {new:true, runValidators:true}
        );
    res.status(StatusCodes.OK).json({message:"Update successful", result});
}

const deleteProduct = async (req,res) => {
    const {id:productId} = req.params;
    const product = await Product.findOne({_id:productId});
    if(!product) {
        throw new BadRequestError(`Product with ID ${productId} not found.`);
    }

    const result = await Product.findOneAndDelete({_id:productId},{new:true});
    res.status(StatusCodes.OK).json({
        message: "Product successfully deleted.",
        data: result
    })
}

module.exports = {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}
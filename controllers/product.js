const Product = require('../models/product')

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
    res.status(200).json({
        message: "success",
        count: products.length, 
        data: { products },
    });
}

const addProduct = async (req,res) => {
    const addedProduct = await Product.create(req.body);
    res.status(200).json(
    { message: "Successfully added product.",
      data: addedProduct
    });
}

const updateProduct = async (req,res) => {
    res.send('update product')
}

const deleteProduct = async (req,res) => {
    res.send('delete product')
}

module.exports = {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}
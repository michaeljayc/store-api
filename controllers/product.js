const BadRequestError = require('../errors/bad-request');
const {StatusCodes} = require('http-status-codes');
const { getProductService,
getProductsService,
createProductService,
updateProductService,
deleteProductService
} = require('../services/product.service');

const getProduct = async (req,res) => {
    const product = await getProductService(req.params.id);
    if(!product) {
        throw new BadRequestError('Product ID does not exist.');
    }

    res.status(StatusCodes.OK).json({
        message: "success",
        product
    })
}

const getProducts = async (req,res) => {
    const products = await getProductsService(req.query);
    res.status(StatusCodes.OK).json({
        message: "success",
        count: products.length, 
        products
    });
}

const addProduct = async (req,res) => {
    const product = await createProductService(req.body);
    res.status(StatusCodes.OK).json({ 
        message: "Successfully added product.",
        product
    });
}

const updateProduct = async (req,res) => {
    const product = await getProductService(req.params.id);
    if(!product) {
        throw new BadRequestError(`Product ID deos not exist.`);
    }

    const result = await updateProductService(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
        message:"Successfully updated product.", 
        product: result
    });
}

const deleteProduct = async (req,res) => {
    const product = await getProductService(req.params.id);
    if(!product) {
        throw new BadRequestError(`Product ID does not exist.`);
    }

    const result = await deleteProductService({_id:req.params.id});
    res.status(StatusCodes.OK).json({
        message: "Successfully deleted product.",
        product: result
    })
}

module.exports = {
    getProduct,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}
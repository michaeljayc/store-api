const BadRequestError = require('../errors/bad-request');
const { StatusCodes } = require('http-status-codes');
const { getStoreService } = require('../services/store.service');
const { 
 getProductService,
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
    const {store_id} = req.body;
    const store = await getStoreService(store_id);
    if(!store) {
        throw new BadRequestError('Store ID does not exist.');
    }
    const product = await createProductService(req.body);
    res.status(StatusCodes.OK).json({ 
        message: "Successfully added product.",
        product
    });
}

const updateProduct = async (req,res) => {
    const {id} = req.params;
    const {store_id} = req.body;

    const product = await getProductService(id);
    if(!product) {
        throw new BadRequestError(`Product ID deos not exist.`);
    }

    if(store_id) {
        const store = await getStoreService(store_id);
        if(!store) {
            throw new BadRequestError('Store ID does not exist.');
        }
    }

    const result = await updateProductService(id, req.body);
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
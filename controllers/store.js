const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const { getCategoryService } = require('../services/category.service');
const {
    getStoreService,
    getStoresService,
    createStoreService,
    updateStoreService,
    deleteStoreService
} = require('../services/store.service');

const getStore = async (req,res) => {
    const store = await getStoreService(req.params.id);
    if(!store) {
        throw new NotFoundError('Store Id does not exist.');
    }
    res.status(StatusCodes.OK).json({
        message:"success",
        store
    })
}

const getAllStores = async (req,res) => {
    const stores = await getStoresService(req.query);
    res.status(StatusCodes.OK).json({
        message:"success",
        count: stores.length,
        stores
    })
}

const addStore = async (req,res) => {
    const category = await getCategoryService(req.body.category_id);
    const storeObj = await createStoreService({...req.body, category});
    const {category_id, ...store} = storeObj;
    res.status(StatusCodes.CREATED).json({
        message:"Store successfully created.",
        store
    })
}

const updateStore = async (req,res) => {
    const {id} = req.params;
    let {category_id, ...storeObj} = req.body;
    
    const store = await getStoreService(id);
    if(!store) {
        throw new BadRequestError('Store ID does not exist.')
    }

    if(req.body.category_id) {

        const category = await getCategoryService(req.body.category_id);
        if(!category) {
            throw new BadRequestError('Category ID does not exist.');
        }
        storeObj = {...storeObj, category};
    }
   
    const result = await updateStoreService(id, storeObj);
    res.status(StatusCodes.OK).json({
        message:"Store successfully updated.",
        store: result
    });
}

const deleteStore = async (req,res) => {
    const {id} = req.params;
    const store = await getStoreService(id);
    if(!store) {
        throw new BadRequestError('Store ID does not exist.');
    }

    const result = await deleteStoreService(id);
    res.status(StatusCodes.OK).json({
        message: "Store successfully deleted",
        store: result
    });
}

module.exports = {
    getStore,
    getAllStores,
    addStore,
    updateStore,
    deleteStore
}
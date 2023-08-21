const Store = require('../models/store');

const getStoreService = async (userId) => {
    return await Store.findOne({_id:userId}).populate('category');
};

const getStoresService = async (query) => {
    const { name, location, category, sort, fields } = query;
    let queryObj = {};

    if(category) {
        queryObj = {'category.name': category}
    }

    if(name) {
        queryObj.name = {$regex:name, $options:'i'};
    }

    if(location) {
        queryObj.location = {$regex:location, $options:'i'};
    }   
    
    const result = Store.find(queryObj);
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

    const stores = await result.skip(skip).limit(limit);
    return stores;
}

const createStoreService = async (requestBody) => {
    const store = await Store.create(requestBody);
    return store._doc;
}

const updateStoreService = async (userId, requestBody) => {
    return await Store.findOneAndUpdate(
        {_id:userId},
        requestBody,
        {new: true}
    );
}

const deleteStoreService = async (userId) => {
    return await Store.findOneAndDelete({_id:userId});
}


module.exports = {
    getStoreService,
    getStoresService,
    createStoreService,
    updateStoreService,
    deleteStoreService
}
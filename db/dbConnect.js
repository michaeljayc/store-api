const mongoose = require('mongoose');
const Product = require('../models/product');

const connectToDB = (uri) => {
    const conn = mongoose.connect(uri);
}

module.exports = connectToDB;

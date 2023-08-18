const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided'],
        minlength: 5,
        maxlength: 25
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided'],
        minlength: 5,
        maxlength: 25
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 3
    },
    category: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }]
},{timestamps:true})

module.exports = mongoose.model('Product', ProductSchema);
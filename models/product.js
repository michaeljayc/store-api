const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'Product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 3
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['Ikea','\Leon\'s','Canadian Tire'],
            message: '{VALUE} is not supported.'
        }
        //enum: ['Ikea','\Leon\'s','Canadian Tire']
    }
})

module.exports = mongoose.model('Product', ProductSchema);
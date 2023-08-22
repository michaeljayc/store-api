const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be provided'],
        minlength: 5,
        maxlength: 25
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price must be provided'],
        minlength: 1,
        maxlength: 10
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 3
    },
    store_id: {
        type: mongoose.Types.ObjectId,
        ref: "Store",
        required: [true, "Please provide Store ID"]
    }
},{timestamps:true, versionKey: false});

module.exports = mongoose.model('Product', ProductSchema);
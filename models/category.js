const mongoose = require('mongoose');

const CategorySchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide category name.'],
        minlength: 3,
        maxlength: 20
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 250
    }
},{timestamps:true, versionKey:false})

module.exports = mongoose.model("Category", CategorySchema);
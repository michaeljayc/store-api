const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name.'],
        unique: true,
        minlength: 3,
        maxlength: 50
    },
    owner: {
        type: String,
        required: [true, "Please provide owner name."]
    },
    date_founded: {
        type: String,
        required: [true, 'Please provide date founded.']
    },
    location: [{
        type: String,
        minlength: 3,
        maxlength:25
    }],
    category_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide Category.'],
        select: false
    },
    category: {
        type: Object
    }

},{timestamps:true, versionKey: false});


module.exports = mongoose.model("Store", StoreSchema);
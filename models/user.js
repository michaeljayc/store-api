const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require('../models/role');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name field required."],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Email field required."],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide valid email."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password field required."],
        minlength: 3
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref:'Role',
        required: [true, "Please provide role id."]
    }
}, {timestamps:true});

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.generateToken = function() {
    return jwt.sign(
        {username: this.username, role: this.role}, 
        process.env.SECRET_TOKEN, 
        {expiresIn: process.env.TOKEN_LIFETIME});
}

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);

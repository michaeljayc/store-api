const mongoose = require('mongoose');

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
        minlength: 3,
        maxlength: 50
    },
    role: {
        type: String,
        // enum: { values: ['admin, user'] },
        enum: ["admin","user"],
        default: "user"
    }
});

module.exports = mongoose.model('User', UserSchema);

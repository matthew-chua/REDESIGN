const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    warning: {
        type: Boolean,
        required: false
    },
    banned: {
        type: Boolean,
        required: false
    },
}, { timestamps: true })

const USER = mongoose.model('User', userSchema);
module.exports = USER; 
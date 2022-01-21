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
    verified: {
        type: Boolean,
        required: true
    },
    banned: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

const USER = mongoose.model('User', userSchema);
module.exports = USER; 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    loanID: {
        type: String,
        required: true
    },
    borrowDate: {
        type: String,
        required: true
    },
    returned: {
        type: Boolean,
        required: true
    },
    warning: {
        type: Boolean,
        required: true
    },
    banned: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

const LOAN = mongoose.model('Loan', userSchema);
module.exports = LOAN; 
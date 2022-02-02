const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    loanID: {
        type: String,
        required: true
    },
    trolleyID: {
        type: String,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true
    },
    returned: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const LOAN = mongoose.model('Loan', loanSchema);
module.exports = LOAN; 
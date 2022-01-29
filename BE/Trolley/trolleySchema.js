const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trolleySchema = new Schema({
    trolleyID: {
        type: String,
        required: true
    },
    shouldUnlock: {
        type: Boolean,
        required: true
    },
    isUnlocked: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const TROLLEY = mongoose.model('Trolley', trolleySchema);
module.exports = TROLLEY; 
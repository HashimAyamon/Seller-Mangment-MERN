const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    account_name : { type: String, required: true },
    branch: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
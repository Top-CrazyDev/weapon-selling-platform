const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: { type: String },
    cart: { 
        type: Array,
        default: []
    },
    wishlist: { 
        type: Array,
        default: []
    },
    logs: {
        type: Array,
        default: []
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
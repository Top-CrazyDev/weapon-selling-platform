const mongoose = require("mongoose");

const zanderSchema = new mongoose.Schema({
    available: { 
        type: Number
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    desc1: { 
        type: String
    },
    desc2: { 
        type: String
    },
    itemnumber: { 
        type: String
    },
    manufacturer: { 
        type: String
    },
    mfgpnumber: { 
        type: String
    },
    msrp: { 
        type: String
    },
    price1: { 
        type: String
    },
    price2: { 
        type: String
    },
    price3: { 
        type: String
    },
    qty1: { 
        type: Number
    },
    qty2: { 
        type: Number
    },
    qty3: { 
        type: Number
    },
    upc: { 
        type: String
    },
    weight: { 
        type: Number
    },
    serialized: { 
        type: String,
        default: 'NO'
    },
    mapprice: {
        type: String
    },
    allowdirectship: { 
        type: String,
        default: 'YES'
    },
    maineachprice: { 
        type: Number
    },
    imagelink: {
        type: String
    },
    featured: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = Zander = mongoose.model("zander", zanderSchema);
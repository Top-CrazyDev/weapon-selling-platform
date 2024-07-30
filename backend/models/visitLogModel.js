const mongoose = require("mongoose");

const visitLogSchema = new mongoose.Schema({
    ip: {
        type: String
    },
    userAgent: {
        type: String
    },
    page: {
        type: String
    },
    timestamp: {
        type: Date,
        default: new Date()
    },
});

module.exports = VisitLog = mongoose.model("visitLog", visitLogSchema);
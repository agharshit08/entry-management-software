const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VisitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    checkInTime : {
        type: Date,
        default: Date.now
    },
    checkOutTime : {
        type: Date,
        required : true
    }
});

module.exports = Visitor = mongoose.model('visitors', VisitorSchema);
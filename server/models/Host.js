const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const HostSchema = new Schema({
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
    address: {
        type: String,
        required: true
    }
});

module.exports = Host = mongoose.model('host', HostSchema);
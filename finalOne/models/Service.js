const mongoose = require('mongoose');

//service data schema

const serviceSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;

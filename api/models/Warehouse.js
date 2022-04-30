const mongoose = require('mongoose');

const Warehouse = new mongoose.Schema({
    transports: {
        type: [{
            transportType: String,
            quantity: Number
        }],
    },
});

module.exports = mongoose.model('Warehouse', Warehouse);
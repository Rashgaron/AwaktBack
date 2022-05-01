const mongoose = require('mongoose');

const Warehouse = new mongoose.Schema({
    transports: {
        type: [{
            transportType: String,
            quantity: Number
        }],
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model('Warehouse', Warehouse);
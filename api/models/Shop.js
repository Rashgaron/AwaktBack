const mongoose = require('mongoose');

const Shop = new mongoose.Schema({
    warehouses: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    monthlyCost: {
        type: Number,
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model('Shop', Shop);
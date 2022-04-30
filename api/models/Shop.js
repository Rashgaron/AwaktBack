const mongoose = require('mongoose');

const Shop = new mongoose.Schema({
    warehouses: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    monthlyCost: {
        type: Number,
    },
});

module.exports = mongoose.model('Shop', Shop);
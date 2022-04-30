const mongoose = require('mongoose');

const Sale = new mongoose.Schema({
    motorBikeId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    saleDate: {
        type: Date,
        required: 'The sale date is required',
    },
    shopId: {   
        type: mongoose.Schema.Types.ObjectId,
    },
    salePrice: {
        type: Number,
        required: 'The sale price is required',
    },
})

module.exports = mongoose.model('Sale', Sale);
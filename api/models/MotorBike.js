const mongoose = require('mongoose');
const MotorBike = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required',
    },
    brandName: {
        type: String 
    },
    saleYear: {
        type: Number,
        required: 'The sale year is required',
    },
    buyPrice: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    refactorPrice: {
        type: Number
    },
})

module.exports = mongoose.model('MotorBike', MotorBike);
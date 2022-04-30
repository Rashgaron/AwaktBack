const mongoose = require('mongoose');
const MotorBike = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required',
    },
    brandName: {
        type: String 
    },
    buyDate: {
        type: Date,
        required: 'The buy date is required',
    },
    buyPrice: {
        type: Number
    },
    refactorPrice: {
        type: Number
    },
})

module.exports = mongoose.model('MotorBike', MotorBike);
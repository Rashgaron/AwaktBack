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
    motorType: {
        type: String,
        enum: ['electric', 'gas'],
    }
})

module.exports = mongoose.model('MotorBike', MotorBike);
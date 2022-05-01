const mongoose = require('mongoose');

const TransportRegister = new mongoose.Schema({
    Origin: {
        type: String,
        required: 'The origin is required',
    },
    Destination: {
        type: String,
        required: 'The destination is required',
    },
    TransportType: {
        type: String,
        required: 'The transport type is required',
    },
    motorBikeId: {
        type: mongoose.Schema.Types.ObjectId,
    },
})

module.exports = mongoose.model('TransportRegister', TransportRegister);
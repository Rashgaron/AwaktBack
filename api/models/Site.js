const mongoose = require('mongoose');

const Site = new mongoose.Schema({
    coordinates: {
        lng: {
            type: Number,
            required: 'The longitude is required',
        },
        lat: {
            type: Number,
            required: 'The longitude is required',
        }
    },
    direction: {
        type: String,
        required: 'The direction is required',
    },
    capacity: {
        type: Number,
    },
    current: {
        type: Number,
    },
    numEmployees: {
        type: Number,
    },
    zone: {
        type: String,
    },
    Bikes: {
        type:  [mongoose.Schema.Types.ObjectId],
    },
    objectType: {
        type:  String,enum:['warehouse', 'shop']
    },
});

/* Vehicle.index({brand:1, model:1} , { unique: true }); */

module.exports = mongoose.model('Site', Site);
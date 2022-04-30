const mongoose = require('mongoose');

const Report = new mongoose.Schema({
    month: {
        type: String,
        required: 'The month is required',
    },
    year: {
        type: Number,
        required: 'The year is required',
    },
    monthIncome: {
        type: Number,
        required: 'The month income is required',
    },
    monthExpense: {
        type: Number,
        required: 'The month expense is required',
    },
})

module.exports = mongoose.model('Report', Report);
const mongoose = require('mongoose');

const MonthlyReport = new mongoose.Schema({
  date: {
        type: Date,
        required: 'The date is required',
    },
    monthIncome: {
        type: Number,
        required: 'The month income is required',
    },
    monthExpense: {
        type: Number,
        required: 'The month expense is required',
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
})

module.exports = mongoose.model('MonthlyReport', MonthlyReport);
const { MonthlyReport } = require('../models');
const getProfits = async (kpiType, filter, year, month) => {
    switch(kpiType){
        default:
            return await getMonthlyProfits(filter, year, month);
    }
}

const getMonthlyProfits = async (filter, year, month) => {
    let result = [];
    const data = await MonthlyReport.find();
    if(filter === "month"){
        data.map(x => {
            if(x.date.getFullYear() == year){
                let selected = `${x.date.getFullYear()}-${x.date.getMonth()}`;
                result[selected] = (result[selected] || {count: 0, year: x.date.getFullYear(), month: x.date.getMonth(), profit: x.monthIncome-x.monthExpense});
                result[selected].count += 1;
                result[selected].profit += ((result[selected].profit * (result[selected].count -1) ) + (x.monthIncome-x.monthExpense)) / result[selected].count; 
            } 
        })
    }

    return Object.entries(result).map(([key, value]) => ({date: key, profit: value.profit}));    
}

module.exports = {
    getProfits
}
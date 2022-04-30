const { MotorBikes } = require('../models');

const getCost = async (kpiType, filter, year) => {
    switch (kpiType) {
        case 'buy':
            return getCostBuys(filter, year);
        case 'refactor':
            return getCostRefactor(filter, year);
        default:
            return null;
    }
}

const getCostBuys = async (filter, year) => {
    const motos = await MotorBikes.find();
    let result = {};
    if(filter === "month"){
        motos.map(x => {
            if(x.buyDate.getFullYear() == year){
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] = (result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] || {count: 0});
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`].count += x.buyPrice;
            }
        });
    }else if(filter === "year"){
        motos.map(x => {
            result[`${x.buyDate.getFullYear()}`] = (result[`${x.buyDate.getFullYear()}`] || {count: 0});
            result[`${x.buyDate.getFullYear()}`].count += x.buyPrice;
        });
    }
    return Object.entries(result).map(([key, value]) => ({year: key, count: value.count}));
}

const getCostRefactor = async (filter, year) => {
    const motos = await MotorBikes.find();
    let result = {};
    if(filter === "month"){
        motos.map(x => {
            if(x.buyDate.getFullYear() == year){
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] = (result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] || {count: 0});
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`].count += x.refactorPrice;
            }
        });
    }else if(filter === "year"){
        motos.map(x => {
            result[`${x.buyDate.getFullYear()}`] = (result[`${x.buyDate.getFullYear()}`] || {count: 0});
            result[`${x.buyDate.getFullYear()}`].count += x.refactorPrice;
        });
    }
    return Object.entries(result).map(([key, value]) => ({year: key, count: value.count}));
}

module.exports = {
    getCost
}
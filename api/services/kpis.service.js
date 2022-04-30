const { MotorBikes } = require('../models');
const getPurchases = async (kpiType, filter) => {
    switch (kpiType) {
        case 'most_bought':
            return getMostBuyedMotorbikes(filter);
        case 'type':
            return getByType(filter);
        case 'purchases':
            return await getBuys(filter);
        default: 
            return null;
    }
} 

const getMostBuyedMotorbikes = () => {}

const getByType = async () => {
    const motos = await MotorBikes.find();
    let result = {};
    motos.map(x => {
        result[x.motorType] ? 
        result[x.motorType] +=1: 
        result[x.motorType] = 1;
    })
    return Object.entries(result);
}

const getBuys = async (filter) => {
    const motos = await MotorBikes.find();
    let result = {};
    if(filter === "month"){
        motos.map(x => {
            result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] ? 
            result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] += 1: 
            result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] = 1;
        });
    }else if(filter === "year"){
        motos.map(x => {
            result[`${x.buyDate.getFullYear()}`] ? 
            result[`${x.buyDate.getFullYear()}`] += 1: 
            result[`${x.buyDate.getFullYear()}`] = 1;
        });
    }
    
    return Object.entries(result);
}

module.exports = {
    getPurchases
}
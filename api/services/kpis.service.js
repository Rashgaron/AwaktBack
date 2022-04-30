const { MotorBikes } = require('../models');
const getPurchases = async (kpiType, filter, year) => {
    switch (kpiType) {
        case 'most_bought':
            return getMostBoughtMotorbikes(filter, year);
        case 'type':
            return getByType(filter, year);
        case 'purchases':
            return await getBuys(filter, year);
        default: 
            return null;
    }
} 

const getMostBoughtMotorbikes = async (filter, year) => {
    const motos = await MotorBikes.find();
    if(filter === "month")
        motos = motos.filter(x => x.buyDate.getFullYear() == year);

    let result = {};
    motos.map(x => {
        result[x.brandName] = (result[x.brandName] || {count: 0}); 
        result[x.brandName].count += 1;
    })

}

const getByType = async (filter, year) => {
    let motos = await MotorBikes.find();
    if(filter === "month")
        motos = motos.filter(x => x.buyDate.getFullYear() == year);
    let result = {};
    motos.map(x => {
        result[x.motorType] = (result[x.motorType] || {count: 0});
        result[x.motorType].count += 1;
    })
    return result;
}

const getBuys = async (filter, year) => {
    const motos = await MotorBikes.find();
    let result = {};
    if(filter === "month"){
        motos.map(x => {
            if(x.buyDate.getFullYear() == year){
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] = (result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] || {count: 0});
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`].count += 1;
            }
        });
    }else if(filter === "year"){
        motos.map(x => {
            result[`${x.buyDate.getFullYear()}`] = (result[`${x.buyDate.getFullYear()}`] || {count: 0});
            result[`${x.buyDate.getFullYear()}`].count += 1;
        });
    }
    return result; 
}

module.exports = {
    getPurchases,
}
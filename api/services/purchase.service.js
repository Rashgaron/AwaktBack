const { MotorBikes } = require('../models');

const getPurchases = async (kpiType, filter, year) => {
    let data = await MotorBikes.find();
    switch (kpiType) {
        case 'most_bought':
            return getMostBoughtMotorbikes(filter, year, data);
        case 'type':
            return getByType(filter, year, data);
        case 'purchases':
            return await getBuys(filter, year, data);
        default: 
            return null;
    }
} 

const getMostBoughtMotorbikes = async (filter, year, data) => {
    let result = [];
    if(filter === "month"){
        data = data.filter(x => x.buyDate.getFullYear() == year);
            data.map(x => {
                if(x.buyDate.getFullYear() == year){
                    result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}-${x.brandName}`] = (result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}-${x.brandName}`] || {count: 0, brandName: x.brandName});
                    result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}-${x.brandName}`].count += 1;
                }
            });
    }else {
        data.map(x=>{
            result[`${x.buyDate.getFullYear()}-${x.brandName}`] = (result[`${x.buyDate.getFullYear()}-${x.brandName}`] || {count: 0, brandName: x.brandName});
            result[`${x.buyDate.getFullYear()}-${x.brandName}`].count += 1;
        })
    }

    return Object.entries(result).map(([key, value]) => ({date: key, brandName: value.brandName, count: value.count}));
}

const getByType = async (filter, year, data) => {
    let result = [];
    if(filter === "month"){
        data.map(x => {
            if(x.buyDate.getFullYear() == year){
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}-${x.motorType}`] = (result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}-${x.motorType}`] || {count: 0, motorType: x.motorType});
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}-${x.motorType}`].count += 1;
            }
        });
    }else {
        data.map(x=>{
            result[`${x.buyDate.getFullYear()}-${x.motorType}`] = (result[`${x.buyDate.getFullYear()}-${x.motorType}`] || {count: 0, motorType: x.motorType});
            result[`${x.buyDate.getFullYear()}-${x.motorType}`].count += 1;
        })
    }

    return Object.entries(result).map(([key, value]) => ({date: key, motorType: value.motorType, count: value.count}));
}

const getBuys = async (filter, year, data) => {
    let result = {};
    if(filter === "month"){
        data.map(x => {
            if(x.buyDate.getFullYear() == year){
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] = (result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] || {count: 0});
                result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`].count += 1;
            }
        });
    }else if(filter === "year"){
        data.map(x => {
            result[`${x.buyDate.getFullYear()}`] = (result[`${x.buyDate.getFullYear()}`] || {count: 0});
            result[`${x.buyDate.getFullYear()}`].count += 1;
        });
    }
    return Object.entries(result).map(([key, value]) => ({year: key, count: value.count}));
}

module.exports = {
    getPurchases,
}

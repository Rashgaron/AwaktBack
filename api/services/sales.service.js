const { MotorBikes, Sales } = require('../models');

const getSales = async (kpiType, filter, year) => {
    switch (kpiType) {
        case 'most_sold':
            return getMostSoldMotorbikes(filter, year);
        case 'type':
            return getByTypeTime(filter, year);
        case 'sales':
            return await getSalesTime(filter, year);
        default: 
            return null;
    }
} 

const getMostSoldMotorbikes = async (filter, year) => {
    let sales = await Sales.find();
    if(filter === "month")
        sales = sales.filter(x => x.saleDate.getFullYear() == year);
    let result = {};
    
    

    sales.map(x => {
        result[x.brandName] = (result[x.brandName] || {count: 0}); 
        result[x.brandName].count += 1;
    })

    return Object.entries(result).map(([key, value]) => ({brandName: key, count: value.count}));
}

const getByTypeTime = async (filter, year) => {
    let sales = await Sales.find();
    if(filter === "month")
        sales = sales.filter(x => x.saleDate.getFullYear() == year);
    let result = {};
    sales.map(x => {
        result[x.motorType] = (result[x.motorType] || {count: 0});
        result[x.motorType].count += 1;
    })
    return Object.entries(result).map(([key, value]) => ({motorType: key, count: value.count}));
}

const getSalesTime = async (filter, year) => {
    const sales = await Sales.find();
    let result = {};
    if(filter === "month"){
        sales.map(x => {
            if(x.saleDate.getFullYear() == year){
                result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}`] = (result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}`] || {count: 0});
                result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}`].count += 1;
            }
        });
    }else if(filter === "year"){
        sales.map(x => {
            result[`${x.saleDate.getFullYear()}`] = (result[`${x.saleDate.getFullYear()}`] || {count: 0});
            result[`${x.saleDate.getFullYear()}`].count += 1;
        });
    }
    return Object.entries(result).map(([key, value]) => ({year: key, count: value.count}));
}

module.exports = {
    getSales
}
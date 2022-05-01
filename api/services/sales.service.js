const { MotorBikes, Sales } = require('../models');

const getSales = async (kpiType, filter, year) => {
    let data = await Sales.find();
    switch (kpiType) {
        case 'most_sold':
            return getMostSoldMotorbikes(filter, year, data);
        case 'type':
            return getByTypeTime(filter, year, data);
        case 'sales':
            return await getSalesTime(filter, year);
        default: 
            return null;
    }
} 

const getMostSoldMotorbikes = async (filter, year, data) => {
    let result = [];
    if(filter === "month")
        await Promise.all(data.map(async (x) => {
            if(x.saleDate.getFullYear() == year){
                const motorBike = await MotorBikes.findOne({_id: x.motorBikeId});
                result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}-${motorBike.brandName}`] = (result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}-${motorBike.brandName}`] || {count: 0, brandName: motorBike.brandName});
                result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}-${motorBike.brandName}`].count += 1;
            }
        }))
    else{
        await Promise.all(data.map(async (x) => {
            const motorBike = await MotorBikes.findOne({_id: x.motorBikeId});
            result[`${x.saleDate.getFullYear()}-${motorBike.brandName}`] = (result[`${x.saleDate.getFullYear()}-${motorBike.brandName}`] || {count: 0, brandName: motorBike.brandName});
            result[`${x.saleDate.getFullYear()}-${motorBike.brandName}`].count += 1;
        })) 
    }


    return Object.entries(result).map(([key, value]) => ({brandName: key, count: value.count}));
}

const getByTypeTime = async (filter, year, data) => {
    let result = [];
    if(filter === "month")
        await Promise.all(data.map(async (x) => {
            if(x.saleDate.getFullYear() == year){
                const motorBike = await MotorBikes.findOne({_id: x.motorBikeId});
                result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}-${motorBike.motorType}`] = (result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}-${motorBike.motorType}`] || {count: 0, motorType: motorBike.motorType});
                result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}-${motorBike.motorType}`].count += 1;
            }
        }))
    else{
        await Promise.all(data.map(async (x) => {
            const motorBike = await MotorBikes.findOne({_id: x.motorBikeId});
            result[`${x.saleDate.getFullYear()}-${motorBike.motorType}`] = (result[`${x.saleDate.getFullYear()}-${motorBike.motorType}`] || {count: 0, motorType: motorBike.motorType});
            result[`${x.saleDate.getFullYear()}-${motorBike.motorType}`].count += 1;
        })) 
    }

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
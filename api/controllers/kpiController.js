// getPurchases, sales, costs, profits, inventory, zones
const { kpisServices } = require('../services');
const { MotorBikes, Sites, Shops, WareHouses }= require('../models');
const getPurchases = async (req, res) => {
    try {
        const data = await kpisServices.getPurchases(req.query.kpiType, req.query.filter, req.query.year);    
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}
let max = 41.438824137155535;
let min = 41.44760026283956;
let maxLat =2.0602118129696407;
let minLat = 2.061566654440412;
const populate = async (req, res) => {
    for(let i = 0; i < 1000; i++){
        let random = Math.random();
        const site = await Sites.create({
            coordinates:{
                lng: random * (max - min) + min,
                lat: random * (maxLat - minLat) + minLat
            },
            direction: "hola",
            capacity: Math.random(),
            current: Math.random(),
            numEmployees: Math.random(),
            MotorBikes: [],
            objectType: Math.round(Math.random()) ? "warehouse" : "shop",
        })
        if(site.objectType === "warehouse"){
            const warehouse = await WareHouses.create({
                siteId: site._id,
                transports: [],
            })
        }else {
            const shop = await Shops.create({
                siteId: site._id,
                warehouses: [],
                monthlyCost: Math.random()
            })
        }
    }

    return res.status(200).send(moto);
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
    getPurchases,
    populate
}
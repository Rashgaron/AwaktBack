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

const getCosts = async (req, res) => {
    try {
       const data = await kpisServices.getCosts(req.query.kpiType, req.query.filter, req.query.year); 
       return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const populate = async (req, res) => {
    await populateMotorBikes();
    return res.status(200).send(moto);
}

const populateMotorBikes = async (req, res) => {
    for(let i = 0; i < 10000; i++){
        MotorBikes.create({
            name: "hola",
            brandName: `tesla${10%i}`,
            buyDate: randomDate(new Date(2019, 0, 1), new Date()),
            buyPrice: Math.random(),
            refactorPrice: Math.random(),
            motorType: Math.round(Math.random()) ? "electric" : "gas",
        })
    }
}

let max = 41.438824137155535;
let min = 41.44760026283956;
let maxLat =2.272574;
let minLat = 2.113856;

const populateBikes = async (req, res) => {
    for(let i = 0; i < 1000; i++){
        let random = Math.random();
        const site = await Sites.create({
            coordinates:{
                lat: random * (max - min) + min,
                lng: random * (maxLat - minLat) + minLat
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

}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
    getPurchases,
    populate,
    getCosts
}
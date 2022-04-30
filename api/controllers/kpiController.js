// getPurchases, sales, costs, profits, inventory, zones
const { kpisServices } = require('../services');
const { MotorBikes }= require('../models');
const getPurchases = async (req, res) => {
    try {
        const data = await kpisServices.getPurchases(req.query.kpiType, req.query.filter, req.query.year);    
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const getSales = async (req, res) => {
    try {
        const data = await kpisServices.getSales(req.query.kpiType, req.query.filter, req.query.year);    
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const populate = async (req, res) => {
    MotorBikes.create({
        name: "compra",
        brandName: "tesla",
        buyDate: new Date("2021-01-28"),
        buyPrice: 100,
        refactorPrice: 50,
    });

    for(let i = 0; i < 1000; i++){
        MotorBikes.create({
            name: "compra",
            brandName: "tesla",
            buyDate: randomDate(new Date("2019-01-01"), new Date()),
            buyPrice: Math.random(),
            refactorPrice: Math.random(),
        });
    }
    const moto = await MotorBikes.find();
    let result = {};
    moto.map(x => {
        result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] ? 
        result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] += 1: 
        result[`${x.buyDate.getFullYear()}-${x.buyDate.getMonth()}`] = 1;
    });
    return res.status(200).send(moto);
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
    getPurchases,
    getSales,
    populate
}
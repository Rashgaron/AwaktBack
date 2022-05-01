const { MotorBikes, Sites, Shops, WareHouses, MonthlyReport }= require('../models');

const populate = async (req, res) => {
    await populateMonthlyReport();
    return res.status(200).send(moto);
}

const populateMonthlyReport = () => {
    for(let i = 0; i < 100; i++){
        MonthlyReport.create({
            date: new Date(`201${i%9}`, i%12, 1),
            monthIncome: Math.random() * 1000,
            monthExpense: Math.random() * 1000,
            siteId: "626dd32f45b9d006d79ebba6"
        })
    }
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

const populateSales = async (req, res) => {
    Sales.create({
        motorBikeId: "626cd76309a1b95e4985f0ff",
        brandName: "tesla",
        saleDate: new Date("2021-01-28"),
        shopId: "626cbaf2e86a3c6f52cba40b",
        salePrice: 5050,
    });

    const sale = await Sales.find();
    let result = {};
    sale.map(x => {
        result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}`] ? 
        result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}`] += 1: 
        result[`${x.saleDate.getFullYear()}-${x.saleDate.getMonth()}`] = 1;
    });
    return res.status(200).send(sale);
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
    populate,
    populateSales,
}

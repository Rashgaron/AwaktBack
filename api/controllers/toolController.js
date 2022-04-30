const { MotorBikes, Sites, Shops, WareHouses, Sales, MonthlyReport }= require('../models');

const populate = async (req, res) => {
    try {
        await populateMonthlyReport();
        return res.status(200);       
    } catch (error) {
        return res.status(500).send(error.toString());
    }

}

const populateMonthlyReport = async () => {
    for(let i = 0; i < 9; i++){
        const data = await MonthlyReport.create({
            siteId: "626d6667f45da7a5b44f7a60",
            date: new Date(`2021-0${i+1}-28`),
            monthIncome: Math.random() * 100,
            monthExpense: Math.random() * 100,
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

let maxLng = 2.033515;
let minLng =  2.27394;
let maxLat = 41.34101057533281;
let minLat = 41.469659 ;

const populateSites = async (req, res) => {
    await Sites.collection.drop();
    await WareHouses.collection.drop();
    await Shops.collection.drop();

    for(let i = 0; i < 60; i++){
        let randomLat = Math.random();
        let randomLng = Math.random();
        let capacity = Math.floor(Math.random() * 100) + 1;
        const site = await Sites.create({
            coordinates:{
                lat: randomLat * (maxLat - minLat) + minLat,
                lng: randomLng * (maxLng - minLng) + minLng
            },
            direction: `C/ Valencia ${i}`,
            capacity: capacity, 
            current: capacity - Math.floor(Math.random() * capacity),
            numEmployees: capacity,
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

const populateSales = async () => {
    const sale = await Sales.create({
        motorBikeId: "626d198ad9adb714aee7da85",
        brandName: "tesla",
        saleDate: new Date("2020-01-28"),
        shopId: "626d198ad9adb714aee7da85",
        salePrice: 5050,
    });

    console.log(sale);

    return sale;
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
    populate,
    populateSales,
}

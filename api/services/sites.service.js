const { Sites, WareHouses, Shops } = require('../models');

const getAll = async () => {
    const sites = await Sites.find();
    const result = Promise.all(
        sites.map( async (site) => {
            if(site.objectType === "warehouse"){
                const warehouse = await WareHouses.findOne({ siteId : site._id });
                return {
                    coordinates: site.coordinates,
                    direction: site.direction,
                    capacity: site.capacity,
                    current: site.current,
                    numEmployees: site.numEmployees,
                    zone: site.zone,
                    bikes: site.Bikes,
                    objectType: site.objectType,
                    transports: warehouse.transports
                }

            }else{
                const shop = await Shops.findOne({ siteId : site._id });
                return {
                    coordinates: site.coordinates,
                    direction: site.direction,
                    capacity: site.capacity,
                    current: site.current,
                    numEmployees: site.numEmployees,
                    zone: site.zone,
                    bikes: site.Bikes,
                    objectType: site.objectType,
                    warehouses: shop.warehouses, 
                    monthlyCost: shop.montlyCost
                };
            }
        }))
    return result;
}

module.exports = {
    getAll
}
const { Sites, WareHouses, Shops } = require('../models');

const getAll = async () => {
    const sites = await Sites.find();
    let result = [];
    result = await Promise.all(
        sites.map( async (site) => {
            return await feedSite(site);
        }))
    return result;
}

const feedSite = async (site) => {
    if(site.objectType === "warehouse"){
        const warehouse = await WareHouses.findOne({ siteId : site._id });
        return {
            id: site._id, 
            coordinates: site.coordinates,
            direction: site.direction,
            capacity: site.capacity,
            current: site.current,
            numEmployees: site.numEmployees,
            zone: site.zone,
            bikes: site.Bikes,
            objectType: site.objectType,
            transports: warehouse?.transports
        }

    }else{
        const shop = await Shops.findOne({ siteId : site._id });
        return {
            id: site._id,
            coordinates: site.coordinates,
            direction: site.direction,
            capacity: site.capacity,
            current: site.current,
            numEmployees: site.numEmployees,
            zone: site.zone,
            bikes: site.Bikes,
            objectType: site.objectType,
            warehouses: shop?.warehouses, 
            monthlyCost: shop?.montlyCost
        };
    }
}

const getById = async (id) => {
    const data = await Sites.findOne({ _id: id });
    return await feedSite(data);
}

module.exports = {
    getAll,
    getById
}
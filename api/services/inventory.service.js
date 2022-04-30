const { Sites, WareHouses, Shops } = require('../models');
const getInventory = async (filter) => {
    const data = await Sites.find();
    if(filter === "warehouses"){
    }
    else if(filter === "shops"){

    }

}

module.exports = {
    getInventory
}
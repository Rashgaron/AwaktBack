const { Sites, WareHouses, Shops } = require('../models');
const getInventory = async (filter) => {
    const data = await Sites.find();
    let result = []
    result = data.filter(x => x.objectType === filter);
    result = result.map(x => {
        const percentage = (x.current / x.capacity) * 100;
        return {
            id: x._id,
            percentage,
        }
    })
    return result;
}

module.exports = {
    getInventory
}
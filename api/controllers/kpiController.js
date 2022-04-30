// getPurchases, sales, costs, profits, inventory, zones
const { kpisServices } = require('../services');

const getPurchases = async (req, res) => {
    try {
        const data = await kpisServices.getPurchases();    
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

module.exports = {
    getPurchases
}
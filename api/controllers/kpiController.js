// getPurchases, sales, costs, profits, inventory, zones
const { purchaseService } = require('../services');

const getPurchases = async (req, res) => {
    try {
        const data = await purchaseService.getPurchases(req.query.kpiType, req.query.filter, req.query.year);    
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const getCosts = async (req, res) => {
    try {
       const data = await kpisServices.getCosts(req.query.kpiType, req.query.filter, req.query.year); 
       return res.status(200).send(data);
    }catch(error){
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

module.exports = {
    getPurchases,
    getSales,
    getCosts
}

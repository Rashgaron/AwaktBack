const { siteServices } = require('../services');
const getAll = async (req, res) => {
    try {
        const result = await siteServices.getAll(); 
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send(error);    
    }
}

module.exports = {
    getAll
}
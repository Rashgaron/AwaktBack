require('dotenv').config({path: '../.env'});
const { userService } = require('../services');
const { Sites, Shops, WareHouses} = require("../models")

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        return res.status(200).send({ users });
    } catch (error) {
    return res.status(500).send({msg: error.toString()});
    }
}

const populate = async (req, res) => {
    try {

        const siteWarehouse = await Sites.create({
            coordinates: {
                lat: 22,
                lng: 33
            },
            direction: "C/ Valencia 38",
            capacity: 100,
            current: 69,
            numEmployees: 10,
            zone: 'Salou',
            Bikes: [],
            objectType: "warehouse"
        })
        console.log("site warehouse")
        const siteShop = await Sites.create({
            coordinates: {
                lat: 22,
                lng: 33
            },
            direction: "C/ Canonge Pibernat 7",
            capacity: 10,
            current: 6,
            numEmployees: 5,
            zone: 'Barcelona',
            Bikes: [],
            objectType: "shop"
        })
        const shop = await Shops.create({
            warehouses: [],
            monthlyCost: 10000,
            siteId: siteShop._id
        })
        const warehouse = await WareHouses.create({
            transports: [
                {transportType: "truck",
                quantity: 3},
                {transportType: "wagon",
                quantity: 4},
            ],
            siteId: siteWarehouse._id
        })
        return res.status(200);
    } catch (error) {
        console.log(error)
    return res.status(500).send({msg: error.toString()});
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if(!user) return res.status(404).send({msg: "User not found"});

        return res.status(200).send({user});
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.user.id, req.body);
        if(!user) return res.status(404).send({msg: "User not found"});

        return res.status(200).send({user});
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        if(!user) return res.status(404).send({msg: "User not found"});

        if(user._id.toString() === req.user.id.toString()) {
            await userService.deleteUser(user._id);
            return res.status(200).send({msg: "User deleted"});
        }else {
            return res.status(403).send({msg: "You are not authorized"});
        }
    } catch (error) {
        return res.status(500).send({msg: error.toString()});
    }
}


module.exports = {
    getAll,
    getById,
    updateUser,
    deleteUser,
    populate,
}; 

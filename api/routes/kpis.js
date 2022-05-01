const express = require('express');
const router = express.Router();
const { KpisController } = require('../controllers');

// api/kpis/purchases
router.get('/purchases', KpisController.getPurchases);

// api/kpis/profits
router.get('/profits', KpisController.getProfits);

router.get('/inventory', KpisController.getInventory);

// api/kpis/costs
router.get('/costs', KpisController.getCosts);
router.get('/sales', KpisController.getSales);

module.exports = router;

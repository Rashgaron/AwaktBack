const express = require('express');
const router = express.Router();
const { KpisController } = require('../controllers');

// api/kpis/purchases
router.get('/purchases', KpisController.getPurchases);

// api/kpis/costs
router.get('/costs', KpisController.getCosts);
router.get('/sales', KpisController.getSales);

router.get('/populate', KpisController.populate);

router.get('/populateSales', KpisController.populateSales);

module.exports = router;

const express = require('express');
const router = express.Router();
const { KpisController } = require('../controllers');

// api/kpis/purchases
router.get('/purchases', KpisController.getPurchases);

// api/kpis/costs
router.get('/costs', KpisController.getCosts);

router.get('/populate', KpisController.populate);

module.exports = router;
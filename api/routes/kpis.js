const express = require('express');
const router = express.Router();
const { KpisController } = require('../controllers');

// api/kpis/purchases
router.get('/purchases', KpisController.getPurchases);

router.get('/sales', KpisController.getSales);

router.get('/populate', KpisController.populate);

module.exports = router;
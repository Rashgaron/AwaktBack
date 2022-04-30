const express = require('express');
const router = express.Router();
const { ToolsController } = require('../controllers');

// api/tools/populate
router.get('/populate', ToolsController.populate);

module.exports = router;
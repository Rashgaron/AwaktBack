const express = require('express');
const router = express.Router();
const { SitesController } = require('../controllers');

// api/sites
router.get('/', SitesController.getAll);

module.exports = router;

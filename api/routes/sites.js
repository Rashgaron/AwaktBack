const express = require('express');
const router = express.Router();
const { SitesController } = require('../controllers');

// api/sites
router.get('/', SitesController.getAll);

// api/sites/:id
router.get('/:id', SitesController.getById);

module.exports = router;

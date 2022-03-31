const express = require('express');

const router = express.Router();

// get controllers
const statsController = require('../controllers/stats-controller');

// prepare routes
router.get('/', statsController.getStats);

module.exports = router;

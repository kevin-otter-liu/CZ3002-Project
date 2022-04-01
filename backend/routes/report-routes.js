const express = require('express');

const router = express.Router();

// get controllers
const statsController = require('../controllers/report-controller');

// prepare routes
router.get('/', statsController.cInvoice);

module.exports = router;

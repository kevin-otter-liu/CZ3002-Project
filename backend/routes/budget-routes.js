const express = require('express');

const router = express.Router();

// get controllers
const budgetController = require('../controllers/budget-controller');

// prepare routes
router.post('/', budgetController.createBudget);
router.get('/', budgetController.getBudget);
router.put('/', budgetController.updateBudget);
router.delete('/', budgetController.deleteBudget);

module.exports = router;

const express = require('express');

const router = express.Router();

// get controllers
const transactionController = require('../controllers/transaction-controller');

// prepare routes
router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransaction);
router.put('/', transactionController.updateTransaction);
router.delete('/', transactionController.deleteTransaction);

module.exports = router;

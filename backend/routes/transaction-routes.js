const express = require('express');

const router = express.Router();

// get controllers
const transactionController = require('../controllers/transaction-controller');

// prepare routes
router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransaction);
router.patch('/', transactionController.updateTransaction);
router.delete('/:transaction_key', transactionController.deleteTransaction);

module.exports = router;

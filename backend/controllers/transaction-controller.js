const Transaction = require('../models/Transaction');

const createTransaction = async (req, res, next) => {
  // TODO: implement validations for
  console.log(req.body);

  //   const TransactionDate = new Date().now();

  let transactionDate = new Date();
  // create new transaction
  const createdTransaction = new Transaction({
    ...req.body,
    date_of_transaction: transactionDate,
  });

  // save new transaction to database
  try {
    await createdTransaction.save();
    res.status(200).send(req.body);
  } catch (error) {
    console.log(`Couldnt create Transaction with error: ${error}`);
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {};

const deleteTransaction = async (req, res, next) => {};

const getTransaction = async (req, res, next) => {};
module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
};

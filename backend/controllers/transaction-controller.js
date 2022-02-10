const Transaction = require('../models/Transaction');
const User = require('../models/User');
const HttpError = require('../libs/http-error');
const { v4: uuid } = require('uuid');

const createTransaction = async (req, res, next) => {
  // TODO: implement validations for

  let transactionDate = new Date();
  let txKey = `TX-` + uuid();

  let { _id: user_id } = req.user;
  // create new transaction
  const createdTransaction = new Transaction({
    user_id: user_id,
    transaction_key: txKey,
    ...req.body,
    date_of_transaction: transactionDate,
  });

  // save new transaction to database
  try {
    await createdTransaction.save();
    res
      .status(200)
      .send({ transaction_key: txKey, date_of_transaction: transactionDate });
  } catch (error) {
    console.log(error);
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

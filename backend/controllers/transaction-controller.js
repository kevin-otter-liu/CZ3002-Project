const Transaction = require('../models/Transaction');
const User = require('../models/User');
const HttpError = require('../libs/http-error');
const { v4: uuid } = require('uuid');

const createTransaction = async (req, res, next) => {
  // TODO: implement validations

  let { description, type, category, amount, currency } = req.body;
  let { user } = req;
  let transactionDate = new Date();

  let newTransaction = {
    user_id: user._id,
    transaction_key: `TX-` + uuid(),
    description,
    type,
    category,
    amount,
    currency,
    date_of_transaction: transactionDate,
  };
  const createdTransaction = new Transaction(newTransaction);

  // save new transaction to database
  try {
    await createdTransaction.save();

    res.status(200).send(newTransaction);
  } catch (error) {
    console.log(`Couldnt create Transaction with error: ${error}`);
    let httpError = new HttpError(null, null);
    return next(httpError);
  }
};

const updateTransaction = async (req, res, next) => {
  let params = req.body;
  let transaction = await Transaction.findOne({
    transaction_key: params.transaction_key,
  });

  if (!transaction) {
    return next(new HttpError(404, 'transaction_not_found'));
  }

  // checking to only update fieldsthat are emptu
  for (let field in params) {
    console.log(field);
    !field ? null : (transaction[field] = params[field]);
  }

  try {
    let savedTransaction = await transaction.save();
    let response = savedTransaction.toObject();
    delete response._id;
    delete response.__v;
    res.status(200).send(response);
  } catch (error) {
    return next(new HttpError(null, null));
  }

  next();
};

const deleteTransaction = async (req, res, next) => {
  let { transaction_key } = req.params;
  console.log(req.params.transaction_key);
  let transaction = await Transaction.findOne({
    transaction_key,
  });

  console.log(JSON.stringify(transaction));
  if (!transaction) {
    return next(new HttpError(404, 'transaction_not_found'));
  }

  try {
    await transaction.remove();
  } catch (error) {
    return next(new HttpError(null, null));
  }

  res.status(200).send();
};

const getTransaction = async (req, res, next) => {
  let { user } = req;
  let transactions = await Transaction.find(
    { user_id: user._id },
    { _id: 0, __v: 0 }
  ).sort({
    date_of_transaction: 'desc',
  });

  res.status(200).send(transactions);
  next();
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
};

const Transaction = require('../models/Transaction');
const User = require('../models/User');
const HttpError = require('../libs/http-error');
const { v4: uuid } = require('uuid');

const createTransaction = async (req, res, next) => {
  // TODO: implement validations for

  let { description, type, category, amount, currency } = req.body;
  let transactionDate = new Date();

  const createdTransaction = new Transaction({
    user_id: user._id,
    transaction_key: `TX-` + uuid(),
    description,
    type,
    category,
    amount,
    currency,
    date_of_transaction: transactionDate,
  });

  // save new transaction to database
  try {
    await createdTransaction.save();
    res.status(200).send({ createdTransaction });
  } catch (error) {
    console.log(`Couldnt create Transaction with error: ${error}`);
    let httpError = new HttpError(null, null);
    return next(httpError);
  }
};

const updateTransaction = async (req, res, next) => {
  let { user } = req.user;

  let { transaction_key, description, type, category, amount, currency } =
    req.body;
  let updatedTransaction = await Transaction.updateMany(
    { transaction_key },
    { description, type, category, amount, currency }
  );

  await updatedTransaction.save();

  res.status(200).send({
    transaction_key,
    description,
    type,
    category,
    amount,
    currency,
    user_key: user.user_key,
  });
};

const deleteTransaction = async (req, res, next) => {
  let { transaction_key } = req.body.transaction_key;

  try {
    await Transaction.findAndDelete({ transaction_key });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send();
};

const getTransaction = async (req, res, next) => {
  let { user } = req.user;
  let transactions = await Transaction.find({ user_key: user.user_key });

  if (!transactions) {
    let error = new HttpError(404, 'transaction_not_found');
    return next(error);
  }

  delete transactions._id;
  delete transactions.created_at;
  delete transactions.updated_at;
  res.status(200).send(transactions);
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
};

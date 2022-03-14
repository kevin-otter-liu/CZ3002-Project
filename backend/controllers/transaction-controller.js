const Transaction = require('../models/Transaction');
const User = require('../models/User');
const HttpError = require('../libs/http-error');
const { v4: uuid } = require('uuid');
var dayjs = require('dayjs');
let isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const { hasExceededBudget } = require('../libs/db-utils');
const mailer = require('../libs/mailer');

const createTransaction = async (req, res, next) => {
  // TODO: implement validations
  let { description, type, category, amount, currency, payment_method } =
    req.body;
  let { user } = req;
  let transactionDate = new Date();

  let newTransaction = {
    payment_method,
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

  let ExceedBudgetCheck = await hasExceededBudget(user._id, category);
  if (ExceedBudgetCheck instanceof HttpError) {
    return next(ExceedBudgetCheck);
  }

  // send noti mail to user
  if (ExceedBudgetCheck === true) {
    mailer.sendMail(
      user.email,
      `budget exceeded for category:${category}`,
      'your budget has exceeded'
    );
    console.log('noti mail sent');
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

  // checking to only update fields that are empty
  for (let field in params) {
    !field ? null : (transaction[field] = params[field]);
  }

  try {
    let savedTransaction = await transaction.save();
    let response = savedTransaction.toObject();
    delete response._id;
    delete response.__v;
    res.status(200).send(response);
  } catch (error) {
    return next(new HttpError());
  }

  let ExceedBudgetCheck = await hasExceededBudget(user._id, category);
  if (ExceedBudgetCheck instanceof HttpError) {
    return next(ExceedBudgetCheck);
  }

  // send noti mail to user
  if (ExceedBudgetCheck === true) {
    mailer.sendMail(
      user.email,
      `budget exceeded for category:${category}`,
      'your budget has exceeded'
    );
    console.log('noti mail sent');
  }
  next();
};

const deleteTransaction = async (req, res, next) => {
  let { transaction_key } = req.params;
  let transaction = await Transaction.findOne({
    transaction_key,
  });

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

const getTransactionsInRange = async (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    return next(new HttpError(423, 'missing_query_params'));
  }
  if (req.query.duration !== 'daily' && req.query.duration !== 'weekly') {
    return next(new HttpError(423, 'invalid_query_params'));
  }

  let { user } = req;

  let sorted_transactions = await Transaction.find(
    { user_id: user._id },
    { _id: 0, __v: 0 }
  ).sort({
    date_of_transaction: 'desc',
  });

  if (sorted_transactions.length === 0) {
    res.status(200).send({ message: 'no_transactions' });
  }

  let card = {
    date: null,
    daily_income: 0,
    daily_expense: 0,
    transactions: [],
  };
  let grouped_transactions = [card];
  let grouped_counter = 0;
  let lowerBoundDate = dayjs(
    sorted_transactions[0].date_of_transaction
  ).startOf('day');
  let upperBoundDate = dayjs(
    sorted_transactions[0].date_of_transaction
  ).startOf('day');

  sorted_transactions.map((transaction) => {
    let currentTransactionDate = dayjs(transaction.date_of_transaction);
    if (
      lowerBoundDate.isSameOrBefore(currentTransactionDate) &&
      upperBoundDate.isAfter(currentTransactionDate)
    ) {
      grouped_transactions[i].date = currentTransactionDate;
      // implement logit to incremetn income and expense
      grouped_transactions[i].transactions.push(transaction);
    } else {
      lowerBoundDate = dayjs(transaction.date_of_transaction);
      upperBoundDate = dayjs(transaction.date_of_transaction);
      grouped_counter += 1;
      grouped_transactions.push(card);
      grouped_transactions[i].date = currentTransactionDate;
      grouped_transactions[i].transactions.push(transaction);
    }
  });

  res.status(200).send(grouped_transactions);
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
  getTransactionsInRange,
};

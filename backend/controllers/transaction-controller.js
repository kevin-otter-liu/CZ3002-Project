const Transaction = require('../models/Transaction');
const User = require('../models/User');
const HttpError = require('../libs/http-error');
const { v4: uuid } = require('uuid');
var dayjs = require('dayjs');
let isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const { getDifference, hasExceededBudget } = require('../libs/db-utils');
const mailer = require('../libs/mailer');

const createTransaction = async (req, res, next) => {
  // TODO: implement validations
  let {
    description,
    type,
    category,
    amount,
    currency,
    payment_method,
    date_of_transaction,
  } = req.body;
  let { user } = req;
  let transactionDate = new Date(date_of_transaction);

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
    let response = await createdTransaction.save();
    let casted_response = response.toObject();
    delete casted_response._id;
    delete casted_response.__v;
    casted_response.amount = parseFloat(casted_response.amount);
    res.status(200).send(casted_response);
  } catch (error) {
    console.log(`Couldnt create Transaction with error: ${error}`);
    let httpError = new HttpError(null, null);
    return next(httpError);
  }

  let ExceedBudgetCheck = await hasExceededBudget(user._id, category);
  if (ExceedBudgetCheck instanceof HttpError) {
    console.log('user has no budget instantiated');
  }

  // send noti mail to user
  if (ExceedBudgetCheck === true) {
    mailer.sendMail(
      user.email,
      `Budget exceeded for ${category} category`,
      'Your budget has exceeded',
      { amount: await getDifference(user._id, category), category: category }
    );
    console.log('noti mail sent');
  }
};

const updateTransaction = async (req, res, next) => {
  let params = req.body;

  let { user } = req;
  let transaction = await Transaction.findOne({
    transaction_key: params.transaction_key,
  });

  if (!transaction) {
    return next(new HttpError(404, 'transaction_not_found'));
  }

  // checking to only update fields that are empty
  for (let field in params) {
    if (field === 'date_of_transaction') {
      transaction['date_of_transaction'] = new Date(params[field]);
    } else {
      !field ? null : (transaction[field] = params[field]);
    }
  }
  let savedTransaction;
  try {
    savedTransaction = await transaction.save();
    let response = savedTransaction.toObject();
    delete response._id;
    delete response.__v;
    response.amount = parseFloat(response.amount);
    res.status(200).send(response);
  } catch (error) {
    return next(new HttpError());
  }

  let ExceedBudgetCheck = await hasExceededBudget(
    user._id,
    savedTransaction.category
  );
  if (ExceedBudgetCheck instanceof HttpError) {
    return next(ExceedBudgetCheck);
  }

  // send noti mail to user
  if (ExceedBudgetCheck === true) {
    mailer.sendMail(
      user.email,
      `Budget exceeded for ${savedTransaction.category} category`,
      'Your budget has exceeded',
      {
        amount: await getDifference(user._id, savedTransaction.category),
        category: savedTransaction.category,
      }
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

  if (transactions.length > 0) {
    transactions = transactions.map((transaction) => {
      formatted_transaction = transaction.toObject();
      formatted_transaction.amount = parseFloat(formatted_transaction.amount);
      return formatted_transaction;
    });
  }

  res.status(200).send(transactions);
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

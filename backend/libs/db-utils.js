const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const HttpError = require('../libs/http-error');

const hasExceededBudget = async (user_id, category) => {
  let user = await User.findOne({ _id: user_id });

  // throw error if no user
  if (!user) {
    return new HttpError('404', 'user_not_found');
  }

  let current_date = new Date();

  let budget = await Budget.findOne({
    user_id: user_id,
    category: category,
    period_start_date: { $lte: current_date },
    period_end_date: { $gt: current_date },
  });

  if (!budget) {
    return new HttpError('404', 'budget_not_found');
  }

  let transactions_sum = await Transaction.aggregate([
    {
      $match: {
        date_of_transaction: {
          $gte: budget.period_start_date,
          $lt: budget.period_end_date,
        },
        user_id: user_id,
        category: category,
      },
    },
    {
      $group: {
        _id: null,
        total_amount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  let transactions_sum_float;

  if (transactions_sum.length < 1) {
    return new HttpError('404', 'transactions_not_found');
  }

  transactions_sum_float = parseFloat(transactions_sum[0].total_amount);

  if (transactions_sum_float > budget.amount) {
    return true;
  }
  return false;
};

// gets the exceeded amount of Budget
const getDifference = async (user_id, category) => {
  let user = await User.findOne({ _id: user_id });

  // throw error if no user
  if (!user) {
    return false;
  }

  let current_date = new Date();

  let budget = await Budget.findOne({
    user_id: user_id,
    category: category,
    period_start_date: { $lte: current_date },
    period_end_date: { $gt: current_date },
  });

  if (!budget) {
    throw new Error('no budget found');
  }

  let transactions_sum = await Transaction.aggregate([
    {
      $match: {
        date_of_transaction: {
          $gte: budget.period_start_date,
          $lt: budget.period_end_date,
        },
        user_id: user_id,
        category: category,
      },
    },
    {
      $group: {
        _id: null,
        total_amount: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  let transactions_sum_float;

  if (transactions_sum.length < 1) {
    throw new Error('no transactions made');
  }

  transactions_sum_float = parseFloat(transactions_sum[0].total_amount);

  let transaction_budget_difference = transactions_sum_float - budget.amount;
  return transaction_budget_difference;
};

module.exports = {
  hasExceededBudget,
  getDifference,
};

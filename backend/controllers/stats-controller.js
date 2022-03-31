const Transaction = require('../models/Transaction');

const getStats = async (req, res, next) => {
  let { user } = req;
  var date = new Date();

  // first day is the start of the month a year before
  // last day is the start of the month this year
  var firstDay = new Date(date.getFullYear() - 1, date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // find average stats of entire database for each category
  let all_result = await Transaction.aggregate([
    {
      $match: {
        date_of_transaction: {
          $gte: firstDay,
          $lte: lastDay,
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date_of_transaction' },
          month: { $month: '$date_of_transaction' },
          category: '$category',
        },
        average: { $avg: '$amount' },
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ]);
  // find our stats for each category for user
  let user_result = await Transaction.aggregate([
    {
      $match: {
        user_id: user._id,
        date_of_transaction: {
          $gte: firstDay,
          $lte: lastDay,
        },
      },
    },
    {
      $sort: {
        date_of_transaction: 1,
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date_of_transaction' },
          month: { $month: '$date_of_transaction' },
          category: '$category',
        },
        average: { $avg: '$amount' },
      },
    },
  ]);
  //format response

  console.log(user_result);
  res.status(200).send(user_result);
  next();
};

module.exports = {
  getStats,
};

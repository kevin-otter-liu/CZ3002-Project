const Transaction = require('../models/Transaction');
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getStats = async (req, res, next) => {
  String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
      return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
  };
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
        '_id.year': 1,
        '_id.month': 1,
        '_id.category': 1,
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
        '_id.year': 1,
        '_id.month': 1,
        '_id.category': 1,
      },
    },
  ]);

  //format response

  let formatted_response = {
    user: user_result.map((element) => {
      return {
        year: element._id.year.toFixed,
        month: element._id.month,
        [`my${element._id.category.replaceAt(
          0,
          element._id.category.substring(0, 1).toUpperCase()
        )}`]: Number(parseFloat(element.average.toString()).toFixed(2)),
      };
    }),
    average: all_result.map((element) => {
      return {
        year: element._id.year,
        month: element._id.month,
        [`avg${element._id.category.replaceAt(
          0,
          element._id.category.substring(0, 1).toUpperCase()
        )}`]: Number(parseFloat(element.average.toString()).toFixed(2)),
      };
    }),
  };

  let fr_pointer = 0;
  let fin_res_pointer = 0;
  let fin_res = [];
  while (fr_pointer < formatted_response.user.length) {
    if (fin_res[fin_res_pointer] === undefined) {
      fin_res.push({
        ...formatted_response.user[fr_pointer],
        ...formatted_response.average[fr_pointer],
      });
      console.log(`initial ${JSON.stringify(fin_res[fin_res_pointer])}`);
      fr_pointer += 1;
    } else if (
      formatted_response.user[fr_pointer].month ===
      fin_res[fin_res_pointer].month
    ) {
      fin_res[fin_res_pointer] = {
        ...formatted_response.user[fr_pointer],
        ...fin_res[fin_res_pointer],
        ...formatted_response.average[fr_pointer],
      };
      fr_pointer += 1;
      console.log(`Addtion ${JSON.stringify(fin_res[fin_res_pointer])}`);
    } else {
      fin_res_pointer += 1;
    }
  }

  fin_res = fin_res.map((element) => {
    let temp_element = {
      ...element,
      month: `${monthNames[element.month - 1]} ${element.year}`,
    };
    delete temp_element.year;
    return temp_element;
  });

  res.status(200).send(fin_res);
  next();
};

module.exports = {
  getStats,
};

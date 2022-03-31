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
      $project: {
        year: 1,
        month: 1,
        category: 1,
        average: 1,
      },
    },
    // {
    //   $sort: {
    //     year: 1,
    //     month: 1,
    //   },
    // },
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

  // let formatted_response = [];
  // console.log(all_result.length);
  // console.log(user_result.length);

  // for (let i = date.getFullYear() - 1; i < date.getFullYear(); i++) {
  //   for (let j = 0; j < 12; j++) {
  //     let formatted_object = {
  //       month: `${monthNames[(date.getMonth() + j) % 12]} ${i}`,
  //     };
  //     formatted_response.push(formatted_object);
  //   }
  // }
  // for (let i = 0; i < all_result.length; i++) {
  //   let all_object = all_result[i];
  //   let user_object = user_result[i];
  //   let formatted_object = {
  //     month: `${monthNames[all_object._id.month - 1]} ${user_object._id.year}`,
  //     // myFood: user_object._id,
  //     // myTransport: 90.354,
  //     // myApparel: 14.472,
  //     // mySocialLife: 28.597,
  //     // myHousehold: 91.827,
  //     // myGift: 20.362,
  //     // myOther: 150.243,
  //     // avgOther: 45.093,
  //     // avgFood: 6.679,
  //     // avgTransport: 28.638,
  //     // avgApparel: 5.133,
  //     // avgSocialLife: 6.333,
  //     // avgHousehold: 27.693,
  //     // avgGift: 8.318,
  //   };
  //   formatted_response.push(formatted_object);
  // }

  //format response

  let formatted_response = {
    user: user_result.map((element) => {
      return {
        year: element._id.year,
        month: element._id.month,
        category: element._id.category,
        average: Number(parseFloat(element.average.toString()).toFixed(2)),
      };
    }),
    average: all_result.map((element) => {
      return {
        year: element._id.year,
        month: element._id.month,
        category: element._id.category,
        average: Number(parseFloat(element.average.toString()).toFixed(2)),
      };
    }),
  };
  res.status(200).send(formatted_response);
  next();
};

module.exports = {
  getStats,
};

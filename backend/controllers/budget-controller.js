const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const {
  v4: uuid
} = require('uuid');
const e = require('cors');
const {
  getDifference,
  hasExceededBudget
} = require('../libs/db-utils');
const HttpError = require('../libs/http-error');
const mailer = require('../libs/mailer');



const createBudget = async (req, res, next) => {
  let {
    user
  } = req;
  console.log(req.body);
  const start_date = new Date(req.body.period_start_date);
  const end_date = new Date(req.body.period_end_date);

  if (start_date > end_date) {
    res.status(400).send('start date must be before end date');
  } else {
    let budget_data = new Budget({
      user_id: user._id,
      budget_key: `BG-` + uuid(),
      amount: req.body.amount,
      category: req.body.category,
      period_start_date: start_date,
      period_end_date: end_date,
    });

    let existing_category = await Budget.find({
      user_id: user._id,
    }).distinct('category');

    if (existing_category.includes(req.body.category)) {
      return next(new HttpError(423, 'existing_category_found'));
    }

      let data = await budget_data.save();
      if (data) {
        formatted_budget = convertToFloat(budget_data);
        res.status(200).send(formatted_budget);
        console.log('your data has been successfully saved.');
      } else {
        return next(new HttpError(423, 'budget_not_saved'));
      }
    
  }

  handleExceedBudget(user, req);
};

const updateBudget = async (req, res, next) => {
  let {
    user
  } = req;
  let {
    budget_key,
    amount,
    category,
    period_start_date,
    period_end_date
  } =
  req.body;
  const start_date = new Date(period_start_date);
  const end_date = new Date(period_end_date);


  var updatedBudget = updateBudgetFunc(start_date,end_date,budget_key,amount,category);
  if (updatedBudget) {
    formatted_budget = convertToFloat(updatedBudget);
  } else {
    return next(new HttpError(423, 'budget_not_updated'));
  }
  res.status(200).send(formatted_budget);
  handleExceedBudget(user, req);
};

async function updateBudgetFunc(start_date,end_date,budget_key,amount,category){
  try {
    var updatedBudget = await Budget.findOneAndUpdate({
    budget_key: budget_key,
  }, {
    amount,
    category,
    period_start_date: start_date,
    period_end_date: end_date,
  }, {
    new: true,
  },
  (err, category) => {
    if (err) {
      res.status(400);
      res.send(err);
    }
  }
).clone();
} catch (error) {
console.log(error);
}
return updatedBudget;
}

const deleteBudget = async (req, res, next) => {
  try {
    await Budget.findOneAndRemove({
      budget_key: req.body.budget_key,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send();
};

const getBudget = async (req, res, next) => {
  //SORTED BY START DATE DESC ORDER
  let budgets = await Budget.find({}, {
    _id: 0,
    __v: 0,
  }).sort('-period_start_date');


  if (budgets.length === 0) {
    return next(new HttpError(404, 'budget_not_found'));
  }

  budgets = budgets.map((budget, i) => {
    formatted_budget = convertToFloat(budget);
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    formattedBudget = updateBudgetFunc(firstDay,lastDay,budget.budget_key,budget.amount,budget.category);
    return formatted_budget;
  });

  totalExpense = await getTotalExpenses(req.user);
  var output = merge(budgets,totalExpense);
  res.status(200).send(output);
};

function merge(budget,expense) {
  arrayList = [], obj_c_processed = [];

  for (var i in budget) {
      var obj = {user_id: budget[i].user_id, 
                budget_key: budget[i].budget_key,
                amount: budget[i].amount,
                category: budget[i].category,
                period_start_date: budget[i].period_start_date,
                period_end_date: budget[i].period_end_date
              };
  
      for (var j in expense) {
          if (budget[i].category == expense[j]._id) {
              obj.total_expense = expense[j].total;
              obj_c_processed[expense[j]._id] = true;
          }
      }
      if (obj.total_expense==null){
        obj.total_expense=0;
      }
      arrayList.push(obj);
  }

  return arrayList.sort((a, b) => parseFloat(b.total_expense) - parseFloat(a.total_expense));
;
  }
  

async function getTotalExpenses(user) {

  let unique_categories = await Budget.find().distinct('category');
  // console.log(unique_categories);

  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let total_expense = await Transaction.aggregate(
    [{
        $match: {
          $and: [{
              date_of_transaction: {
                $gte: firstDay,
                $lte: lastDay
              },
              user_id:user._id
            }, {
              category: {
                "$in": unique_categories
              }
            },
            {
              type: "expense"
            }
          ]
        }
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount"
          }
        }
      }
    ]);
  if (total_expense) {
    formatted_expense = total_expense.map((expense, i) => {
      expense.total = parseFloat(expense.total);
      return expense;
    });
    // console.log(formatted_expense);

    return formatted_expense;
  }
};


function convertToFloat(budget) {
  formatted_budget = budget.toObject();
  formatted_budget.amount = parseFloat(formatted_budget.amount);
  return formatted_budget;
};



const handleExceedBudget = async (user, req) => {
  let ExceedBudgetCheck = await hasExceededBudget(user._id, req.body.category);
  if (ExceedBudgetCheck instanceof HttpError) {
    return next(ExceedBudgetCheck);
  }

  // send noti mail to user
  if (ExceedBudgetCheck === true) {
    mailer.sendMail(
      user.email,
      `budget exceeded for category:${req.body.category}`,
      null, {
        amount: await getDifference(user._id, req.body.category),
        category: req.body.category,
      }
    );
    console.log('noti mail sent');
  }
};





module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudget,
  getTotalExpenses
};
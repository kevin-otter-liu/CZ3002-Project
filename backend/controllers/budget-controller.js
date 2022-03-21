const Budget = require('../models/Budget');
const {
  v4: uuid
} = require('uuid');
const e = require('cors');
const {
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
      user_id: user._id
    }).distinct('category');

    if (existing_category.includes(req.body.category)) {
      return next(new HttpError(423, 'existing_category_found'));
    }

    try {
      let data = await budget_data.save();
      if (data) {
        formatted_budget = budget_data.toObject();
        formatted_budget.amount = parseFloat(formatted_budget.amount);
        res.status(200).send(formatted_budget);
        console.log("your data has been successfully saved.");
      } else {
        return next(new HttpError(423, 'budget_not_saved'));
      }
    } catch {
      return next(new HttpError(423, 'budget_not_saved'));
    }
  };

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

  try {
    var updatedBudget = await Budget.findOneAndUpdate({
        budget_key: budget_key
      }, {
        amount,
        category,
        period_start_date: start_date,
        period_end_date: end_date
      }, {
        new: true
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
  if (updatedBudget) {
    formatted_budget = updatedBudget.toObject();
    formatted_budget.amount = parseFloat(formatted_budget.amount);
  } else {
    return next(new HttpError(423, 'budget_not_updated'));
  }
  res.status(200).send(formatted_budget);
  handleExceedBudget(user, req);
};

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
    __v: 0
  }).sort(
    '-period_start_date'
  );

  if (budgets.length === 0) {
    return next(new HttpError(404, 'budget_not_found'));
  }

  budgets = budgets.map((budget, i) => {
    formatted_budget = budget.toObject();
    formatted_budget.amount = parseFloat(formatted_budget.amount);
    return formatted_budget;
  });
  res.status(200).send(budgets);
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
      'your budget has exceeded'
    );
    console.log('noti mail sent');
  }
};


module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudget,
};
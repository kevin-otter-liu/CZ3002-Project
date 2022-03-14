const Budget = require('../models/Budget');
const { v4: uuid } = require('uuid');
const e = require('cors');
const { hasExceededBudget } = require('../libs/db-utils');

const createBudget = async (req, res, next) => {
  console.log(req.body);
  const start_date = new Date(req.body.period_start_date);
  const end_date = new Date(req.body.period_end_date);

  if (start_date > end_date) {
    res.status(400).send('start date must be before end date');
  } else {
    const budget_data = new Budget({
      user_id: req.user._id,
      budget_key: `BG-` + uuid(),
      amount: req.body.amount,
      category: req.body.category,
      period_start_date: start_date,
      period_end_date: end_date,
    });

    await budget_data.save((err, data) => {
      console.log('analyzing data...');
      if (data) {
        console.log('your data has been successfully saved.');
        res.status(200).json(data);
      } else {
        console.log('Something went wrong while saving data.');
        console.log(err);
        res.status(400);
        res.send(err);
      }
    });
  }

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

const updateBudget = async (req, res, next) => {
  let { budget_key, amount, category, period_start_date, period_end_date } =
    req.body;

  const start_date = new Date(period_start_date);
  const end_date = new Date(period_end_date);

  try {
    let updatedBudget = await Budget.updateOne(
      {
        budget_key,
      },
      {
        amount,
        category,
        period_start_date: start_date,
        period_end_date: end_date,
      },
      (err, category) => {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.status(200).json('Successfully updated!');
        }
      }
    ).clone();
  } catch (error) {
    console.log(error);
  }

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

const deleteBudget = async (req, res, next) => {
  try {
    await Budget.findOneAndRemove({
      budget_key: req.body.budget_key,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json('Successfully deleted!');
};

const getBudget = async (req, res, next) => {
  //SORTED BY START DATE DESC ORDER
  Budget.find({})
    .sort('-period_start_date')
    .then(function (Budget) {
      res.send(Budget);
    });
};
module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudget,
};

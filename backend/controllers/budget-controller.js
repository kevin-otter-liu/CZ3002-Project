const Budget = require('../models/Budget');
const {
  v4: uuid
} = require('uuid');
const e = require('cors');

const createBudget = async (req, res, next) => {
  console.log(req.body);
  const start_date = new Date(req.body.period_start_date);
  const end_date = new Date(req.body.period_end_date);

  if (start_date > end_date) {
    res.status(400).send("start date must be before end date");
  } else {

    let budget_data = new Budget({
      user_id: req.user._id,
      budget_key: `BG-` + uuid(),
      amount: req.body.amount,
      category: req.body.category,
      period_start_date: start_date,
      period_end_date: end_date
    });

    budget_data.save((err, data) => {
      console.log("analyzing data...");
      if (data) {
        formatted_budget = budget_data.toObject();
        formatted_budget.amount = parseFloat(formatted_budget.amount);
        res.status(200).send(formatted_budget);
        console.log("your data has been successfully saved.");
      } else {
        console.log(err);
        res.status(400);
        res.send(err);
      }
    });
  }
};


const updateBudget = async (req, res, next) => {

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

  formatted_budget = updatedBudget.toObject();
  formatted_budget.amount = parseFloat(formatted_budget.amount);
  res.status(200).send(formatted_budget);

};


const deleteBudget = async (req, res, next) => {
  try {
    var deleteBudget = await Budget.findOneAndRemove({
      budget_key: req.body.budget_key
    });
  } catch (error) {
    console.log(error);
  }
  if (!deleteBudget) {
    res.status(404).send();
  }
  res.status(200).send();

};


const getBudget = async (req, res, next) => {
  //SORTED BY START DATE DESC ORDER
  let budgets = await Budget.find({}, { _id: 0, __v: 0 }).sort(
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


module.exports = {
  createBudget,
  updateBudget,
  deleteBudget,
  getBudget,
};
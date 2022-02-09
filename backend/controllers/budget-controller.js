const Budget = require('../models/Budget');

const createBudget = async (req, res, next) => {
  console.log(req.body);
  const start_date = new Date(req.body.period_start_date);
  const end_date = new Date(req.body.period_end_date);
  if (start_date > end_date) {

    res.status(505).send("start date must be before end date");

    }
  else{

    const budget_data = new Budget({
        user_id : req.body.user_id,//temporarily, would need to change to jwt
        amount : req.body.amount,
        category: req.body.category,
        period_start_date : start_date,
        period_end_date : end_date
      });
    
      try {
        await budget_data.save();
            res.status(200).send(req.body);
        } catch (error) {
        console.log(`Couldnt create budget with error: ${error}`);
        next(error);
      }

  }

};

const updateBudget = async (req, res, next) => {};

const deleteBudget = async (req, res, next) => {};

const getBudget = async (req, res, next) => {};
module.exports = {
    createBudget,
    updateBudget,
    deleteBudget,
    getBudget,
};

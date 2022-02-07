const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Budget = mongoose.model("Budget");


router.post("/", async (req, res) => {

  const start_date = new Date(req.body.period_start_date);
  const end_date = new Date(req.body.period_end_date);

  const budget_data = new Budget({
    user_id : req.body.user_id, //temporarily, would need to change to jwt
    amount : req.body.amount,
    category: req.body.category,
    period_start_date : start_date,
    period_end_date : end_date
  });

  await budget_data.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
  });

  module.exports = router;

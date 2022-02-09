const mongoose = require('mongoose');
const Budget = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  period_start_date: {
    type: String,
    required: true,
  },
  period_end_date: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Budget', Budget);

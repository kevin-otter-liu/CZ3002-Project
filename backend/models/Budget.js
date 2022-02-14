const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

const Budget = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    budget_key: { type: String, required: true, unique: true },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    category: {
      type: String,
      required: true,
      unique: true
    },
    period_start_date: {
      type: String,
      required: true,
    },
    period_end_date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


Budget.plugin(uniqueValidator)
module.exports = mongoose.model('Budget', Budget);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  //   _id: { type: Schema.Types.ObjectId },
  tx_key: { type: String },
  user_id: { type: String },
  description: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Schema.Types.Decimal128, required: true },
  currency: { type: String, required: true },
  date_of_transaction: { type: Date },
});

// this will auto match to 'Transactions' in the collection
module.exports = mongoose.model('Transaction', TransactionSchema);

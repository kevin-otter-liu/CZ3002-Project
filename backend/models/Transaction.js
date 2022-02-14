const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transaction_key: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Schema.Types.Decimal128, required: true },
    currency: { type: String, required: true },
    date_of_transaction: { type: Date },
  },
  { timestamps: true }
);

// this will auto match to 'Transactions' in the collection
module.exports = mongoose.model('Transaction', TransactionSchema);

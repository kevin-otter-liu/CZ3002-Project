const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    user_key: { type: String, unique: true, required: true },
    auth: {
      expires_at: { type: Date, required: true },
      token: { type: String, required: true },
    },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// this will auto match to 'Transactions' in the collection
module.exports = mongoose.model('User', UserSchema);

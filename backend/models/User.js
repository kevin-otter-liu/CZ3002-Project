const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  user_key: { type: String, required: true },
  auth_token: {
    expires_in: { type: Date, required: true },
    jwt_token_: { type: String, required: true },
  },
  profile: {
    username: { type: String, required: true },
    email: { type: String, required: true },
  },
});

// this will auto match to 'Transactions' in the collection
module.exports = mongoose.model('User', UserSchema);

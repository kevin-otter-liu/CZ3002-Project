const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  let token;
  let SERVER_SECRET = process.env.SERVER_AUTH_SECRET;
  console.log(req.headers);
  try {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
    console.log(SERVER_SECRET);
  } catch (error) {
    throw new Error('invalid_authorization');
  }

  let payload = jwt.verify(token, SERVER_SECRET);

  console.log(JSON.stringify(payload));

  // get user and append to req body to pass thru middleware
  req.user_key = payload.user_key;

  next();
};

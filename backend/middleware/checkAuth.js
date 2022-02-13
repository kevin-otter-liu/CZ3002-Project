const jwt = require('jsonwebtoken');
const HttpError = require('../libs/http-error');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  let token;
  let SERVER_SECRET = process.env.SERVER_AUTH_SECRET;
  try {
    token = req.headers.authorization.split(' ')[1];
  } catch (error) {
    let newError = new HttpError(422, 'invalid_authorization');
    return next(newError);
  }

  let payload = jwt.verify(token, SERVER_SECRET);

  let { user_key } = payload;
  // check if token expired
  let user = await User.findOne({ user_key: user_key });

  if (!user) {
    let error = new HttpError(404, 'user_not_found');
    return next(error);
  }

  // check expiry time of jwt
  let currentTime = new Date();
  let jwt_expire_at = user.auth.expires_at;
  if (jwt_expire_at.getTime() < currentTime.getTime()) {
    let error = new HttpError(404, 'token_expired');
    return next(error);
  }
  // get user and append to req body to pass thru middleware
  req.user = user;
  next();
};

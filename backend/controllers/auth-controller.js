const ax = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const User = require('../models/User');
const HttpError = require('../libs/http-error');
require('dotenv').config();

const signIn = async (req, res, next) => {
  let { email, password } = req.body;
  let SERVER_SECRET = process.env.SERVER_AUTH_SECRET;
  // TODO: validations

  // check if user is in database with email
  let user;
  try {
    user = await User.findOne({ email: email });
    if (!user) {
      let error = new HttpError(404, 'user_not_found');
      return next(error);
    }
  } catch (error) {
    // server error 500
    return next(error);
  }

  // compare incoming password with password in db
  let authenticated = await bcrypt.compare(password, user.password);

  if (!authenticated) {
    let error = new HttpError(422, 'invalid_password');
    return next(error);
  }
  //generate jwt token
  let token = jwt.sign({ user_key: user.user_key }, SERVER_SECRET, {
    expiresIn: 3600,
  });

  // store expiration date in the database

  let currentTime = new Date();
  let expires_at = currentTime.setSeconds(currentTime.getSeconds() + 3600);
  user.auth.expires_at = expires_at;
  user.auth.token = token;

  try {
    await user.save();
    res
      .status(200)
      .send({ email, user_key: user.user_key, token, expires_in: 3600 });
  } catch (error) {
    return next(error);
  }
};

// Sign Up API
const signUp = async (req, res, next) => {
  let { email, password } = req.body;

  //TODO: validate password fulfils the password standards

  //TODO: validate email fulfils the email standards

  //TODO: validate email not in db
  let user = await User.findOne({ email: email });

  if (user) {
    let error = new HttpError(423, 'email_in_use');
    return next(error);
  }

  // encrypt passwordInput with 12 rounds of salt
  let SERVER_SECRET = process.env.SERVER_AUTH_SECRET;
  let hashed_password;

  try {
    hashed_password = await bcrypt.hash(password, 12);
  } catch (error) {
    // return means stop executing this function
    // next() means execute next middlewware
    // if we dont write return ere, next middleware will execute concurrently and the function will still continue
    return next(error);
  }

  // date of token expiry : 1hr from now
  currentTime = new Date();
  let expireDate = currentTime.setSeconds(currentTime.getSeconds() + 3600);
  let userKey = `user-` + uuid();

  // create jwt token
  let token = jwt.sign(
    {
      user_key: userKey,
    },
    SERVER_SECRET,
    { expiresIn: '1hr' }
  );

  // need check whether uuid in database alr but its like 0.00...1% chance lmao
  let createdUser = new User({
    user_key: userKey,
    email: email,
    username: email,
    password: hashed_password,
    auth: {
      expires_at: expireDate,
      token: token,
    },
  });

  // store created user in db
  try {
    await createdUser.save();
    res.status(200).send({ email, user_key: userKey, token, expires_in: 3600 });
  } catch (error) {
    return next();
  }
};

module.exports = {
  signIn,
  signUp,
};

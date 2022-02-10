const ax = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const User = require('../models/User');
require('dotenv').config();

const signIn = async (req, res, next) => {
  let { email, password } = req.body;
  let SERVER_SECRET = process.env.SERVER_AUTH_SECRET;
  // TODO: validations

  // check if user is in database with email
  let user;
  try {
    user = await User.findOne({ email: email });
    console.log(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    res.status(404).send({ message: `user_not_found` });
  }

  // compare incoming password with password in db
  let authenticated = await bcrypt.compare(password, user.password);

  if (!authenticated) {
    res.status(422).send({ message: `invalid_password` });
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
    console.log(error);
  }
  next();
};

// Sign Up API
const signUp = async (req, res, next) => {
  let { email, password } = req.body;

  //TODO: validate password fulfils the password standards

  //TODO: validate email fulfils the email standards

  //TODO: validate email not in db

  // encrypt passwordInput with 12 rounds of salt
  let hashed_password;
  let SERVER_SECRET = process.env.SERVER_AUTH_SECRET;

  try {
    hashed_password = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
    next();
  }

  //create user in database

  // date of token expiry : 1hr from now
  currentTime = new Date();
  let expireDate = currentTime.setSeconds(currentTime.getSeconds() + 3600);
  let userKey = `user-` + uuid();
  console.log(userKey);
  // create jwt token
  let token = jwt.sign(
    {
      user_id: userKey,
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
    console.log(error);
    res.status(404).send('not found');
  }

  return next();
};

module.exports = {
  signIn,
  signUp,
};

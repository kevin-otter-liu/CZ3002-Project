'use strict';

const { program } = require('commander');
require('dotenv').config();
program
  .version('0.01', '-v --version')
  .option('-p, --production', 'execute in production env')
  .option('-d --development', 'execute in developement env');

program.parse();
const environmentOptions = program.opts();
// check for ' -p -d' specified together
if (environmentOptions.production && environmentOptions.development) {
  throw new Error('Please specify one specific environment');
}

// run on development as default
environmentOptions.production
  ? (process.env.NODE_ENV = 'production')
  : (process.env.NODE_ENV = 'development');

const express = require('express');
const app = express();

// default middelwares
const bodyParser = require('body-parser');
const db = require('./db');
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST,GET,OPTIONS,DELETE,PATCH'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

// custom middlewares
const checkAuth = require('./middleware/checkAuth');

// importing diff api routes
const authApis = require('./routes/auth-routes');
const transactionApis = require('./routes/transaction-routes');
const budgetApis = require('./routes/budget-routes');
const statsApis = require('./routes/stats-routes');
const reportApis = require('./routes/report-routes');

//registering routes
app.use('/api/v1/auth', authApis);

// from here on, routes are all protected by authentication
app.use(checkAuth);
app.use('/api/v1/transaction', transactionApis);
app.use('/api/v1/transaction', transactionApis);
app.use('/api/v1/budget', budgetApis);
app.use('/api/v1/stats', statsApis);
app.use('/api/v1/report', reportApis);

// check for http errors to be passed
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  if (error.error_type === 'string') {
    res
      .status(error.status_code || 500)
      .json({ message: error.message } || 'unknown_error');
  }

  if (error.error_type === 'array') {
    res.status(error.status_code || 500).json(error.message || 'unknown_error');
  }
});

// initialise db, if db error dont start
const SERVER_PORT = process.env.SERVER_PORT || 5000;

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(SERVER_PORT, (error) => {
      console.log(`app is listening at port ${SERVER_PORT}`);
    });
  }
});

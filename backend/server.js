'use strict';
const { program } = require('commander');

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

require('dotenv').config();
const express = require('express');
const app = express();

// default middelwares
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// default middleware used
app.use(
  cors({
    origin: ['http://127.0.0.1:3000', '*'],
  })
);

// custom middlewares
const checkAuth = require('./middleware/checkAuth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// importing diff api routes
const authApis = require('./routes/auth-routes');
const transactionApis = require('./routes/transaction-routes');
const budgetApis = require('./routes/budget-routes');

//registering routes
app.use('/api/v1/auth', authApis);

// from here on, routes are all protected by authentication
app.use(checkAuth);

app.use('/api/v1/transaction', transactionApis);
app.use('/api/v1/budget', budgetApis);

// check for http errors to be passed
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  if (error.error_type === 'string') {
    res.status(error.status_code).json({ message: error.message });
  }

  if (error.error_type === 'array') {
    res.status(error.status_code).json(error.message);
  }

  res.status(500).json({ message: 'unknown_error' });
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

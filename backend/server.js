//server.js
'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// default middleware used
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// importing diff api routes
const authApis = require('./routes/auth-routes');
const transactionApis = require('./routes/transaction-routes');
const budgetApis = require('./routes/budget-routes');

//registering routes
app.use('/api/v1/auth', authApis);
app.use('/api/v1/transaction', transactionApis);
app.use('/api/v1/budget', budgetApis);

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

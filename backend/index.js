'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

//DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to mongodb");
});

require('./models/Budget');


const bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// default middleware used
app.use(cors());
app.use(express.json());

require('./api')(app);

//env file?
// const server_port = process.env.SERVER_PORT || 3000;
const server_port = 5000

app.listen(server_port, (error) => {
  console.log(`app is listening at port ${server_port}`);
});


const budgetRouter = require("./api/Budget.js");
app.use("/budget", budgetRouter);

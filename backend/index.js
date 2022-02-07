'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

//DB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to mongodb");
});

//DB Schema
require('./models/Budget');


const bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// default middleware used
app.use(cors());
app.use(express.json());

require('./api')(app);

const server_port = process.env.SERVER_PORT || 3000;

app.listen(server_port, (error) => {
  console.log(`app is listening at port ${server_port}`);
});


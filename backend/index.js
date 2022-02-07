'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to mongodb");
});


// default middleware used
app.use(cors());
app.use(express.json());

require('./api')(app);

//env file?
const server_port = process.env.SERVER_PORT || 3000;

app.listen(server_port, (error) => {
  console.log(`app is listening at port ${server_port}`);
});

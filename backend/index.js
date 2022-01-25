'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
// default middleware used
app.use(cors());
app.use(express.json());

require('./api')(app);
const server_port = process.env.SERVER_PORT;
app.listen(server_port, (error) => {
  console.log(`app is listening at port ${server_port}`);
});

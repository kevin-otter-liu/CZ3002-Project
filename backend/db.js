//db.js
const mongoose = require('mongoose');
require('dotenv').config();



const dbUri = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
console.log(dbUri);

let _db;

// singleton pattern to initialise database
// we accept a callback as an argument so other functions can call this init_db method
// callback has err,db returned
const initDb = (callback) => {
  if (_db) {
    console.log('database is already intialised');
    return callback(null, _db);
  }

  // else connect to db

  //mongoATLAS
  mongoose
    .connect(process.env.MONGO_URL) 
    .then(() => {
    console.log("connected to mongodb");
    require('./models/Budget');
    return callback(null, _db);
  }).catch((err) => {
    // returns error to function calling it
    // whoever implments the callback function should implement it in a way that
    // that accepts this interface
    callback(err);
  });
  
  ////mongo Local
  // mongoose
  //   .connect(dbUri)

  //   .then(() => {
  //     _db = mongoose.connection.db;

  //     //instantiate DB Schema
  //     require('./models/Budget');
  //     console.log('mongoDB connected');
  //     return callback(null, _db);
  //   })
  //   .catch((err) => {
  //     // returns error to function calling it
  //     // whoever implments the callback function should implement it in a way that
  //     // that accepts this interface
  //     callback(err);
  //   });
};

// function for getting database
const getDb = () => {
  if (!_db) {
    throw Error('Database not initialised');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};

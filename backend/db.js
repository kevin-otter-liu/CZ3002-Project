//db.js
const mongoose = require('mongoose');
require('dotenv').config();
// TODO : unable to update env variable
process.env.NODE_ENV = 'production';
let dbUri;
// use mongo atlas db in prod and local mongo on dev
process.env.NODE_ENV === 'production' ? (dbUri = process.env.MONGO_URL) : null;
process.env.NODE_ENV === 'development'
  ? (dbUri = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
  : null;

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
    .connect(dbUri)
    .then(() => {
      console.log(
        `connected to ${
          process.env.NODE_ENV === 'production'
            ? `Mongo ATLAS at URI ${process.env.MONGO_URL}`
            : `Local MongoDB at port ${process.env.DATABASE_PORT}`
        }`
      );
      return callback(null, _db);
    })
    .catch((err) => {
      // returns error to function calling it
      // whoever implments the callback function should implement it in a way that
      // that accepts this interface
      callback(err);
    });
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

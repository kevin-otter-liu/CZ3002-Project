module.exports = (app) => {
  require('./Auth')(app);
  require('./Budget')(app);
  
};

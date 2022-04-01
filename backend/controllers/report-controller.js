const createInvoice = require('../controllers/report-helper');
const Transaction = require('../models/Transaction');
const path = require('path');
const mailer = require('../libs/mailer');


const cInvoice = async (req, res, next) => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let { user } = req;
    let transactions = await Transaction.find(
       {$and: [{
        date_of_transaction: {
          $gte: firstDay,
          $lte: lastDay
        },
        user_id:user._id
      }]}, 
      { _id: 0, __v: 0 }
    ).sort({
      date_of_transaction: 'desc',
    });
    if (transactions.length > 0) {
      transactions = transactions.map((transaction) => {
        formatted_transaction = transaction.toObject();
        formatted_transaction.amount = parseFloat(formatted_transaction.amount);
        return formatted_transaction;
      });
    }  

    createInvoice(transactions,req.user,path.join(__dirname, '../assets') + '/report.pdf');
    console.log('created');
    mailer.attachAndSendMail(
        user.email,
        `FINAPPSYS monthly report`,
        'Attached is your monthly report',
      );
    console.log('Sent!');
    res.status(200).send();
}

module.exports = {
    cInvoice
};
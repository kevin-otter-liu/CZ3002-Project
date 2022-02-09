const nodemailer = require('nodemailer');

// building the transporter
// the account credentai
const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.email,
    pass: process.env.mailer_password,
  },
  secure: true,
});

// function to send mail
function sendMail (to, subject, text, html) {
  const mailData = {
    from: process.env.email,  // sender address
    to: to,   // list of receivers
    subject: subject,
    text: text,
    html: html,
  };
  transporter.sendMail(mailData, function (err, info) {
  if(err)
    console.log(err)
  else
    console.log(info);
  });
};


module.exports = {
  sendMail
};

const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

// building the transporter
// the account credentials
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.email,
    pass: process.env.mailer_password,
  },
  secure: true,
});

const readHTMLfile = (path, callback) => {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

function attachAndSendMail(to, subject, text, replacements){
  const mailData = {
    from: process.env.email, // sender address
    to: to, // list of receivers
    subject: subject,
    text: text,
    html: html_to_send,
    attachments: [{
      filename: 'report.pdf',
      path: path.join(__dirname, '../assets') + '/report.pdf',
      contentType: 'application/pdf'
    }
],function(err, info) {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    }
}
}
// function to send mail
function sendMail(to, subject, text, replacements) {
  readHTMLfile(process.cwd() + '/assets/noti-email.html', (err, html) => {
    // compile template
    let template = handlebars.compile(html);

    let html_to_send = template(replacements);

    const mailData = {
      from: process.env.email, // sender address
      to: to, // list of receivers
      subject: subject,
      text: text,
      html: html_to_send,
      attachments: [
        {
          filename: 'image-1.png',
          path: process.cwd() + '/assets/images/image-1.png',
          cid: 'unique@image-1',
        },
        {
          filename: 'image-2.png',
          path: process.cwd() + '/assets/images/image-2.png',
          cid: 'unique@image-2',
        },

        {
          filename: 'image-3.png',
          path: process.cwd() + '/assets/images/image-3.png',
          cid: 'unique@image-3',
        },

        {
          filename: 'image-4.png',
          path: process.cwd() + '/assets/images/image-4.png',
          cid: 'unique@image-4',
        },

        {
          filename: 'image-5.svg',
          path: process.cwd() + '/assets/images/image-5.svg',
          cid: 'unique@image-5',
        },
      ],
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  });
}

module.exports = {
  sendMail,
  attachAndSendMail
};

const fs = require("fs");
const PDFDocument = require("pdfkit");
// const imageUrl = require("../assets/images/finappsys.png")
const path = require('path');

module.exports =  function createInvoice(transaction, user, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, user);
  generateInvoiceTable(doc, transaction);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, '../assets/images') + '/finappsys.png', 30, 20, { width: 100 })
    .fillColor("#444444")
    .fontSize(20)
    .text("FINAPPSYS Inc.", 110, 57)
    .fontSize(10)
    .text("FINAPPSYS Inc.", 200, 50, { align: "right" })
    .text("123 Fake NTU Street", 200, 65, { align: "right" })
    .text("Singapore, 359840", 200, 80, { align: "right" })
    .text("123-456-7890", 200, 95, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, user) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Monthly Statement", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Statement Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    // .text("Balance Due:", 50, customerInformationTop + 30)
    // .text(
    //   formatCurrency(invoice.subtotal - invoice.paid),
    //   150,
    //   customerInformationTop + 30
    // )

    .font("Helvetica-Bold")
    .text("username", 300, customerInformationTop)
    .font("Helvetica")
    .text(user.email, 300, customerInformationTop + 15)
    // .text(
    //   invoice.shipping.city +
    //     ", " +
    //     invoice.shipping.state +
    //     ", " +
    //     invoice.shipping.country,
    //   300,
    //   customerInformationTop + 30
    // )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, transaction) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Date",
    "Category",
    "Description",
    "Currency",
    "Amount"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  var counter=0
  var variable = invoiceTableTop;

  for (i = 0; i < transaction.length; i++) {
    const item = transaction[i];
    const dateOfTransaction = item.date_of_transaction.toDateString();
    var position = variable + (counter + 1) * 30;

    if (position > 700){ doc.addPage(); position = 0; counter=0; variable =0;}
    generateTableRow(
      doc,
      position,
      dateOfTransaction,
      item.category,
      item.description,
      item.currency,
      item.amount,
    );

    generateHr(doc, position + 20);
    counter+=1;
  }
  

//   const subtotalPosition = invoiceTableTop + (counter + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "Subtotal",
//     "",
//     formatCurrency(transaction.subtotal)
//   );

//   const paidToDatePosition = subtotalPosition + 20;
//   generateTableRow(
//     doc,
//     paidToDatePosition,
//     "",
//     "",
//     "Paid To Date",
//     "",
//     formatCurrency(invoice.paid)
//   );

//   const duePosition = paidToDatePosition + 25;
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     duePosition,
//     "",
//     "",
//     "Balance Due",
//     "",
//     formatCurrency(invoice.subtotal - invoice.paid)
//   );
//   doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Thank you for using FINAPPSYS.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
    doc,
    y,
    date_of_transaction,
    category,
    description,
    currency,
    amount
) {
  doc
    .fontSize(10)
    .text(date_of_transaction, 50, y)
    .text(category, 280, y, { width: 90, align: "right" })
    .text(description, 150, y)
    .text(currency, 370, y, { width: 90, align: "right" })
    .text(amount, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

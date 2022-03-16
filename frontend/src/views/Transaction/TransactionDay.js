import "./Transaction.css";
import TransactionItem from "./TransactionItem";
import * as utils from "./Util";
import { useSelector } from "react-redux";

import NumberFormat from "react-number-format";

const TransactionDay = (props) => {
  
  // Get all the transactions for that day

  // const transactions = useSelector((state) => state.transactions); 

  // Using static data for now
  const transactions = [    {
    "user_id": "621e3b1ca6f08403e3635a6a",
    "transaction_key": "TX-7281098f-cc19-454b-ace1-329e25903104",
    "description": "coffee",
    "type": "expense",
    "payment_method": "cash",
    "category": "food",
    "amount": 7.5,
    "currency": "SGD",
    "date_of_transaction": "2022-03-15T06:31:24.469Z",
    "createdAt": "2022-03-15T06:31:24.472Z",
    "updatedAt": "2022-03-15T06:31:24.472Z"
},
{
  "user_id": "621e3b1ca6f08403e3635a6a",
  "transaction_key": "TX-0579d59c-e6f8-4fbb-ba22-4ddd3c2d1406",
  "description": "test",
  "type": "expense",
  "payment_method": "cash",
  "category": "transport",
  "amount": 123,
  "currency": "SGD",
  "date_of_transaction": "2022-03-14T14:30:01.292Z",
  "createdAt": "2022-03-14T14:30:01.293Z",
  "updatedAt": "2022-03-14T14:30:01.293Z"
}] 

  const transactionList = utils.transactionsInDate(
    transactions,
    props.date
  );

  switch (transactionList.length > 0) {
    case true:
      return (
        <div className="transaction__container">
          <div className="transaction__control">
            <h3 className="transaction__date">{props.date.toDateString()}</h3>

            <h3 className="transaction__overallIncome">
              <NumberFormat
                value={utils.getOverall(transactionList, "income")}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </h3>
            <h3 className="transaction__overallExpense">
              <NumberFormat
                value={utils.getOverall(transactionList, "expense")}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </h3>
          </div>
          <div className="transaction-list">
            {transactionList.map((transaction) => (
              <TransactionItem
                key={transaction.transaction_key}
                date={new Date(transaction.date_of_transaction)}
                category={transaction.category}
                description={transaction.description}
                amount={transaction.amount}
                type={transaction.type}
                id = {transaction.transaction_key}
              ></TransactionItem>
            ))}
          </div>
        </div>
      );
    case false:
      return null;
    default:
      return null;
  }
};

export default TransactionDay;

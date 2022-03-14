import "./Transaction.css";
import TransactionItem from "./TransactionItem";
import * as utils from "./Util";
import { useSelector } from "react-redux";

import NumberFormat from "react-number-format";

const TransactionDay = (props) => {
  
  // Get all the transactions for that day

  //const transactions = useSelector((state) => state.transactions); 

  
  const transactions = [    {
    "user_id": "620dcdf23c4ac8d22745968a",
    "transaction_key": "TX-7ac4b7d5-a065-4b93-9f1f-513e3a6712f2",
    "description": "coffee",
    "type": "expense",
    "category": "food",
    "amount": {
        "$numberDecimal": "7"
    },
    "currency": "SGD",
    "date_of_transaction": "2022-03-19T06:00:34.477Z",
    "createdAt": "2022-03-18T06:00:34.479Z",
    "updatedAt": "2022-03-18T06:00:34.479Z"
},
{
    "user_id": "620dcdf23c4ac8d22745968a",
    "transaction_key": "TX-9a35712e-4a1a-40d2-9abd-8fc1633215be",
    "description": "salary",
    "type": "income",
    "category": "salary",
    "amount": {
        "$numberDecimal": "10000"
    },
    "currency": "SGD",
    "date_of_transaction": "2022-03-14T06:00:09.689Z",
    "createdAt": "2022-03-17T06:00:09.690Z",
    "updatedAt": "2022-03-17T06:00:09.690Z"
}]  


  console.log(transactions);

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
                amount={transaction.amount.$numberDecimal}
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

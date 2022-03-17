import "./Transaction.css";
import TransactionItem from "./TransactionItem";
import { selectAllTransactions } from "store/Transaction";
import * as utils from "./Util";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const TransactionDay = (props) => {
  
  // Get all the transactions for that day

  const transactions = useSelector((state) => state.transaction.transactions); 
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

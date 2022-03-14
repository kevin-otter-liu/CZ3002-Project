import { useEffect, useState } from "react";

import "./Transaction.css";
import TransactionItem from "./TransactionItem";
import * as utils from "./Util";

const TransactionDay = (props) => {
  // Get all the transactions for that day
  const transactionList = utils.transactionsInDate(props.data, props.date);

  switch (transactionList.length > 0) {
    case true:
      return (
        <div className="transaction__container">
          <div className="transaction__control">
            <h3 className="transaction__date">{props.date.toDateString()}</h3>
            <h3 className="transaction__overallIncome">$ TEST</h3>
            <h3 className="transaction__overallExpense">$ TEST</h3>
          </div>
          <div className="transaction-list">
            {transactionList.map((transaction) => (
              <TransactionItem
                category={transaction.category}
                description={transaction.description}
                amount={transaction.amount.$numberDecimal}
                type={transaction.type}
              ></TransactionItem>
            ))}
          </div>
        </div>
      );
    case false:
      return null;
  }

};

export default TransactionDay;

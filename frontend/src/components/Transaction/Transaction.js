import { useEffect, useState } from "react";

// For UI
import AddCircleIcon from "@mui/icons-material/AddCircle";

import * as utils from "./Util";
import TransactionDay from "./TransactionDay";
import "./Transaction.css";

const Transaction = (props) => {
  let today = new Date();

  const [mth, setMth] = useState(
    today.toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState(today.getUTCFullYear());

  const [allDates, setAllDates] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactions = utils.transactionsMthYr(props.data, mth, year);
    const dates = utils.getDates(mth, year);
    setAllDates(dates);
    setTransactions(transactions);
  }, [setMth, setYear, props.data, setTransactions]);

  return (
    <div className="transaction">
      <h1>{mth + "-" + year}</h1>
      <AddCircleIcon
        sx={{ fontSize: 50 }}
        style={{position:"fixed", bottom:50, right:40}}
      />
      {allDates.map((date) => (
        <TransactionDay data={transactions} date={date}></TransactionDay>
      ))}
    </div>
  );
};

export default Transaction;

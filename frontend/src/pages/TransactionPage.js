import axios from "axios";
import { useState, Fragment, useEffect } from "react";

import MainHeader from "../components/MainHeader";
import Transaction from "../components/Transaction/Transaction";
import TransactionForm from "../components/NewTransaction/TransactionForm";

const TransactionPage = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    axios
      .get("./transaction_dummy.json")
      .then((res) => {
        setTransactionData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTransactionHandler = (transaction) => {
    setTransactionData([transaction, ...transactionData]);
  };

  return (
    <Fragment>
      <MainHeader />
      <Transaction data={transactionData}></Transaction>
    </Fragment>
  );
};

export default TransactionPage;

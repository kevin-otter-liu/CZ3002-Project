import React from 'react'

import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTransactionsAsyn } from "../../store/Transaction";

// For UI
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Transaction from "../Transaction/Transaction";

const TransactionPage = () => {

  // Retrieve the Transaction data 
  /*
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsAsyn());
  }); 
  */

  const navigate = useNavigate();

  const addTransactionButtonHandler = (transaction) => {
    navigate(
      '/utils/transaction/form', {
      state: {
        type: "income",
        date: new Date(),
        category: "",
        amount: "",
        description: "",
        action: "add",
      }
      });
  };

  return (
    <Fragment>
      <IconButton onClick={addTransactionButtonHandler} sx={{ "&:hover": {color: "gray"}}}>
        <AddCircleIcon
          sx={{ fontSize: 50 }}
          style={{ position: "fixed", bottom: 50, right: 50 }}
        />
      </IconButton>
      <Transaction></Transaction>
    </Fragment>
  );
};

export default TransactionPage;

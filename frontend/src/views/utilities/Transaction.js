import React from 'react'

import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

// For UI
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Transaction from "../Transaction/Transaction";

import { getTransactionsAsyn } from "store/Transaction";



const TransactionPage = () => {

  const navigate = useNavigate();

  // Retrieve the Transaction data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionsAsyn());
  }, []);

  const addTransactionButtonHandler = (transaction) => {
    navigate(
      '/utils/transaction/form', {
      state: {
        type: "expense",
        date: new Date(),
        category: "food",
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

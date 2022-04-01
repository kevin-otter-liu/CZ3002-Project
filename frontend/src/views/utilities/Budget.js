import React from 'react'

import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

// For UI
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Budget from "../Budget/Budget";

import { getBudgetsAsyn } from "store/Budget";



const BudgetPage = () => {

  const navigate = useNavigate();

  // Retrieve the Budget data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBudgetsAsyn());
  }, []);

  const addBudgetButtonHandler = (budget) => {
    navigate(
      '/utils/budget/form', {
      state: {
        period_start_date: new Date(),
        period_end_date: new Date(),
        category: "transport",
        amount: "",
        action: "add",
      }
      });
  };

  return (
    <Fragment>
      <IconButton onClick={addBudgetButtonHandler} sx={{ "&:hover": {color: "gray"}}}>
        <AddCircleIcon
          sx={{ fontSize: 50 }}
          style={{ position: "fixed", bottom: 50, right: 50 }}
        />
      </IconButton>
      <Budget></Budget>
    </Fragment>
  );
};

export default BudgetPage;
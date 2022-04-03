import React from "react";

import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// For UI
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Budget from "../Budget/Budget";

import { getBudgetsAsyn } from "store/Budget";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard from "../Budget/BudgetCard";

const BudgetPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBudgetsAsyn());
  }, []);

  const budget = useSelector((state) => state.budget.budgets);

  const addBudgetButtonHandler = (budget) => {
    navigate("/utils/budget/form", {
      state: {
        period_start_date: new Date(),
        period_end_date: new Date(),
        category: "transport",
        amount: "",
        action: "add",
        id: ""
      },
    });
  };

  return (
    <>
      <Container>
        <Stack direction="vertical" gap="3" className="mb-4"></Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budget.map((budget) => (
            <BudgetCard
              id={budget.budget_key} // Make sure you use a unique key identifier for React
              name={budget.category} // This is the url of the image for the current object inside this.state.news.YOUR_CURRENT_OBJECT
              max={budget.amount}
              amount={budget.total_expense}
              start_date={budget.period_start_date}
              end_date={budget.period_end_date}
            />
          ))}
        </div>
      </Container>
      <Fragment>
        <IconButton
          onClick={addBudgetButtonHandler}
          sx={{ "&:hover": { color: "gray" } }}
        >
          <AddCircleIcon
            sx={{ fontSize: 50 }}
            style={{ position: "fixed", bottom: 50, right: 50 }}
          />
        </IconButton>
        <Budget></Budget>
      </Fragment>
    </>
  );
};

export default BudgetPage;

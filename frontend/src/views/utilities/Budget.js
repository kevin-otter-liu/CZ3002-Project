import React from 'react'

import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

// For UI
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Budget from "../Budget/Budget";

import { getBudgetsAsyn } from "store/Budget";


import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
//import AddBudgetModal from "../../../copy/src/views/Budget/AddBudgetModal";
import BudgetCard from "../Budget/BudgetCard";
import { useState } from "react";
//import { useBudgets } from "../../../copy/src/views/Budget/BudgetsContext";
import Axios from "axios";



const BudgetPage = () => {
  const navigate = useNavigate();
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

  // const apiEndpoint = "http://localhost:5000/api/v1/budget";
  const apiEndpoint = "http://172.21.148.163/api/v1/budget";
  const [budget,setBudget]=useState([])
  useEffect(() => {
        fetchComments();
      }, [])
      useEffect(() => {
      }, [budget])
      const fetchComments=async()=>{
        const response=await Axios.get(apiEndpoint, { headers: 
          { 
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            "Content-Type": "application/json", 
          } });
        setBudget(response.data);    
      }

  return (
    <>
      <Container>
        <Stack direction="vertical" gap="3" className="mb-4">
          
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >

            {budget.map((budget) => (
              <BudgetCard
                key={budget.budget_key} // Make sure you use a unique key identifier for React
                name={budget.category} // This is the url of the image for the current object inside this.state.news.YOUR_CURRENT_OBJECT
                max={budget.amount}
                amount={budget.total_expense}
              />
            ))}

          
        </div>
      </Container>
      <Fragment>
      <IconButton onClick={addBudgetButtonHandler} sx={{ "&:hover": {color: "gray"}}}>
        <AddCircleIcon
          sx={{ fontSize: 50 }}
          style={{ position: "fixed", bottom: 50, right: 50 }}
        />
      </IconButton>
      <Budget></Budget>
    </Fragment>
    </>
    
  )
};

export default BudgetPage;
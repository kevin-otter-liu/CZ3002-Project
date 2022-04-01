import React from "react";

import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
//import AddBudgetModal from "../../../copy/src/views/Budget/AddBudgetModal";
import BudgetCard from "../Budget/BudgetCard";
import { useState,useEffect } from "react";
//import { useBudgets } from "../../../copy/src/views/Budget/BudgetsContext";
import Axios from "axios";



const BudgetPage = () => {

  const apiEndpoint = "http://localhost:5000/api/v1/budget";
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
        <Stack direction="horizontal" gap="1" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary">Add Budget</Button>
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
    </>
  )
};

export default BudgetPage;

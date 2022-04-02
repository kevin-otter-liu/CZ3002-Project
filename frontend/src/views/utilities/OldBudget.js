import React from "react";

import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
//import AddBudgetModal from "../../../copy/src/views/Budget/AddBudgetModal";
import BudgetCard from "../Budget/BudgetCard";
//import { useState } from "react";
//import { useBudgets } from "../../../copy/src/views/Budget/BudgetsContext";

const BudgetPage = () => {
  // Matt to add Budget page here

  //const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  //const { budgets, getBudgetExpenses } = useBudgets();

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
          <BudgetCard
            name="Transport"
            gray
            amount={200}
            max={1000}
          ></BudgetCard>
          
        </div>
      </Container>
    </>
  )
};

export default BudgetPage;

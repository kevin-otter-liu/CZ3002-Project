import React from 'react'

import { useLocation } from "react-router-dom";
import BudgetForm from "../NewBudget/BudgetForm";

const BudgetFormPage = () => {
    
  const location = useLocation();

  return (
      <BudgetForm
        period_start_date={location.state.period_start_date}
        period_end_date={location.state.period_end_date}
        category={location.state.category}
        amount={location.state.amount}
        action={location.state.action} 
        id = {location.state.id}
      />
  );
}

export default BudgetFormPage;
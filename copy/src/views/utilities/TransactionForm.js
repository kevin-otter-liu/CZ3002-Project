import React from 'react'

import { useLocation } from "react-router-dom";
import TransactionForm from "../NewTransaction/TransactionForm";

const TransactionFormPage = () => {
    
  const location = useLocation();

  return (
      <TransactionForm
        type={location.state.type}
        date={location.state.date}
        category={location.state.category}
        amount={location.state.amount}
        description={location.state.description}
        action={location.state.action} 
      />
  );
}

export default TransactionFormPage;
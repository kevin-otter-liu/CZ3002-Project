import React, {useContext, useState} from "react"
import { v4 as uuidV4 } from "uuid"
import LocalStorage from "./LocalStorage"

const BudgetsContext = React.createContext()


export function useBudgets() {
    return useContext(BudgetsContext)
  }
  
  export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = LocalStorage("budgets", [])
    const [expenses, setExpenses] = LocalStorage("expenses", [])
  
    function getBudgetExpenses(budgetId) {
      return expenses.filter(expense => expense.budgetId === budgetId)
    }
    function addBudget({ name, max }) {
      setBudgets(prevBudgets => {
        if (prevBudgets.find(budget => budget.name === name)) {
          return prevBudgets
        }
        return [...prevBudgets, { id: uuidV4(), name, max }]
      })
    }
    function deleteBudget({ id }) {
      setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id)
      })
  
      setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id)
      })
    }
  
    return (
      <BudgetsContext.Provider
        value={{
          budgets,
          expenses,
          getBudgetExpenses,
          addBudget,
          deleteBudget,
        }}
      >
        {children}
      </BudgetsContext.Provider>
    )
  }
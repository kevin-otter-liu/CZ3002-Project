import "./Budget.css";
import BudgetItem from "./BudgetItem";
import { selectAllBudgets } from "store/Budget";
import * as utils from "./Util";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const BudgetDay = (props) => {
  
  // Get all the budgets for that day

  const budgets = useSelector((state) => state.budget.budgets); 
  const budgetList = utils.budgetsInDate(
    budgets,
    props.date
  );

  switch (budgetList.length > 0) {
    case true:
      return (
        <div className="budget__container">
          <div className="budget__control">
            <h3 className="budget__date">{props.date.toDateString()}</h3>

            
          </div>
          <div className="budget-list">
            {budgetList.map((budget) => (
              <BudgetItem
                key={budget.budget_key}
                period_start_date = {new Date(budget.date_of_budget)}
                period_end_date = {new Date(budget.date_of_budget)}
                category={budget.category}
                amount={budget.amount}
                id = {budget.budget_key}
              ></BudgetItem>
            ))}
          </div>
        </div>
      );
    case false:
      return null;
    default:
      return null;
  }
};

export default BudgetDay;
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

import "./BudgetItem.css";

const BudgetItem = (props) => {

  const navigate = useNavigate();
  const editBudgetHandler = () => {
    navigate(
      '/utils/budget/form', {
      state: {
        type: props.type,
        date: props.date,
        category: props.category,
        amount: props.amount,
        description: props.description,
        id: props.id,
        action: "edit"
      }
    });
  };

  return (
    <button className="budget-item" onClick={editBudgetHandler}>
      <h4 className="budget-item__category">{props.category}</h4>
      <h4 className="budget-item__description">{props.description}</h4>
      <NumberFormat
        className={
          props.type === "income"
            ? "budget-item__income"
            : "budget-item__expense"
        }
        value={props.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
      />
    </button>
  );
};

export default BudgetItem;

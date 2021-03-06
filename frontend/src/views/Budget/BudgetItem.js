import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

const BudgetItem = (props) => {

  const navigate = useNavigate();
  const editBudgetHandler = () => {
    navigate(
      '/utils/budget/form', {
      state: {
        period_start_date: props.date,
        period_end_date: props.date,
        category: props.category,
        amount: props.amount,
        id: props.id,
        action: "edit"
      }
    });
  };

  return (
    <button className="budget-item" onClick={editBudgetHandler}>
      <h4 className="budget-item__category">{props.category}</h4>
      <NumberFormat
        value={props.amount}
        thousandSeparator={true}
        decimalScale={2}
        fixedDecimalScale={true}
      />
    </button>
  );
};

export default BudgetItem;

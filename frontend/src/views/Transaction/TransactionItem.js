import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

import "./TransactionItem.css";

const TransactionItem = (props) => {

  const navigate = useNavigate();
  const editTransactionHandler = () => {
    navigate(
      '/utils/transaction/form', {
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
    <button className="transaction-item" onClick={editTransactionHandler}>
      <h4 className="transaction-item__category">{props.category}</h4>
      <h4 className="transaction-item__description">{props.description}</h4>
      <NumberFormat
        className={
          props.type === "income"
            ? "transaction-item__income"
            : "transaction-item__expense"
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

export default TransactionItem;

import NumberFormat from "react-number-format";

import "./TransactionItem.css";

const TransactionItem = (props) => {
  return (
    <button className="transaction-item">
      <h4 className="transaction-item__category">{props.category}</h4>
      <h4 className="transaction-item__description">{props.description}</h4>
      <NumberFormat
        className={(props.type==="income")? "transaction-item__income" : "transaction-item__expense"}
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

import { isValidElement, useState } from "react";
import "./TransactionForm.css";

const TransactionForm = (props) => {

  const [enteredType, setEnteredType] = useState("Income");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredNote, setEnteredNote] = useState("");

  const typeChangeHandler = (event) => {
    setEnteredType(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const noteChangeHandler = (event) => {
    setEnteredNote(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const transactionData = {
        description: enteredNote,
        type: enteredType,
        category: enteredCategory,
        amount: enteredAmount,
        date: new Date(enteredDate)
    };

    props.onAddTransactionData(transactionData);
    setEnteredAmount("");
    setEnteredCategory("")
    setEnteredDate("");
    setEnteredNote("");
    setEnteredType("");
  };

  // 5 Input Field - Type, Date, Category, Amount and Note
  return (
    <form onSubmit={submitHandler}>
      <div className="new-transaction__controls">
        <div className="new-transaction__control">
          <label>Date</label>
          <input
            type="date"
            value={enteredDate}
            min="2022-01-01"
            max="2050-12-31"
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-transaction__control">
        <label>Category</label>
          <input type="text" value={enteredCategory} onChange={categoryChangeHandler} />
        </div>
        <div className="new-transaction__control">
        <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-transaction__control">
        <label>Note</label>
          <input type="text" value={enteredNote} onChange={noteChangeHandler} />
        </div>
        <div className="new-transaction__actions">
            <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;

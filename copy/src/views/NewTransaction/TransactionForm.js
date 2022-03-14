import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./TransactionForm.css";
import { addTransactionAsyn, deleteTransactionAsyn, editTransactionAsyn } from "../../store/Transaction";

const TransactionForm = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enteredType, setEnteredType] = useState(props.type);
  const [enteredDate, setEnteredDate] = useState(
    props.date.toLocaleDateString("en-CA")
  );
  const [enteredCategory, setEnteredCategory] = useState(props.category);
  const [enteredAmount, setEnteredAmount] = useState(props.amount);
  const [enteredNote, setEnteredNote] = useState(props.description);

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

    const transaction = {
      description: enteredNote,
      type: enteredType,
      category: enteredCategory,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    console.log(transaction);
    
    // TODO: Add in the following handlers
    if (event.target.value === "add") {
      dispatch(addTransactionAsyn(transaction));
    } else if (props.action === "edit") {
      dispatch(editTransactionAsyn(transaction, props.id));
    } 
    navigate(-1);
  };

  const deleteHandler = () => {
    dispatch(deleteTransactionAsyn(props.id));
  }

  // 5 Input Field - Type, Date, Category, Amount and Note
  return (
    <form onSubmit={submitHandler}>
      {props.action === "add" ? (
        <h1 className="new-transaction__h1">Add Transaction</h1>
      ) : (
        <h1 className="new-transaction__h1">Edit Transaction</h1>
      )}
      <div className="new-transaction__controls">
        <div className="new-transaction__control">
          <div className="new-transaction__actions">
            <Button variant={enteredType==="income"? "contained": "outlined"} value="income" onClick={typeChangeHandler}> 
              Income
            </Button>
            <Button variant={enteredType==="expense"? "contained": "outlined"} value="expense" onClick={typeChangeHandler}>
              Expense
            </Button>
          </div>
        </div>

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
          <div className="new-transaction__actions">
            {enteredType === "income" ? (
              <select value={enteredCategory} onChange={categoryChangeHandler}>
                <option value="salary">Salary</option>
                <option value="allowance">Allowance</option>
                <option value="bonus">Bonus</option>
                <option value="pettycash">Petty cash</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <select value={enteredCategory} onChange={categoryChangeHandler}>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="apparel">Apparel</option>
                <option value="social life">Social Life</option>
                <option value="household">Household</option>
                <option value="gift">Gift</option>
                <option value="others">Other</option>
              </select>
            )}
          </div>
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
        {props.action === "edit" ? (
          <div className="new-transaction__actions">
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button type="submit" variant="contained" onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        ) : props.action === "add"? (
          <div className="new-transaction__actions">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default TransactionForm;

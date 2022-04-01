import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./BudgetForm.css";
import {
  addBudgetAsyn,
  deleteBudgetAsyn,
  editBudgetAsyn,
} from "../../store/Budget";

const BudgetForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [enteredDate, setEnteredDate] = useState(
    props.date.toLocaleDateString("en-CA")
  );
  const [enteredCategory, setEnteredCategory] = useState(props.category);
  const [enteredAmount, setEnteredAmount] = useState(props.amount);
  const [action, setAction] = useState(props.action);

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const onSubmit = (event) => {
    // event.preventDefault();

    const budget = {
      category: enteredCategory,
      amount: enteredAmount,
      period_start_date: new Date(
        enteredDate.getFullYear(),
        enteredDate.getMonth(),
        1
      ),
      period_end_date: new Date(
        enteredDate.getFullYear(),
        enteredDate.getMonth() + 1,
        0
      ),
      id: props.id,
    };

    // TODO: Add in the following handlers
    if (action === "add") {
      dispatch(addBudgetAsyn(budget));
    } else if (action === "edit") {
      dispatch(editBudgetAsyn(budget));
    }
    navigate(-1);
  };

  const deleteHandler = () => {
    setAction("delete");
    dispatch(deleteBudgetAsyn(props.id));
  };

  // 3 Input Field - Date, Category, Amount
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {props.action === "add" ? (
        <h1 className="new-budget__h1">Add Budget</h1>
      ) : (
        <h1 className="new-budget__h1">Edit Budget</h1>
      )}
      <div className="new-budget__controls">
        <div className="new-budget__control">
          <label>Date</label>
          <input
            type="date"
            value={enteredDate}
            min="2022-01-01"
            max="2050-12-31"
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-budget__control">
          <label>Category</label>
          <select
            value={enteredCategory}
            {...register("category", { required: true })}
            onChange={categoryChangeHandler}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="apparel">Apparel</option>
            <option value="social life">Social Life</option>
            <option value="household">Household</option>
            <option value="gift">Gift</option>
            <option value="others">Other</option>
          </select>
        </div>
        <div className="new-budget__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            {...register("amount", { required: true })}
            onChange={amountChangeHandler}
          />
        </div>
        {props.action === "edit" ? (
          <div className="new-budget__actions">
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button type="submit" variant="contained" onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        ) : props.action === "add" ? (
          <div className="new-budget__actions">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </div>
        ) : null}
        {errors.category && (
          <p className="error_message">Please select a category!</p>
        )}
        {errors.amount && (
          <p className="error_message">Please enter an amount!</p>
        )}
      </div>
    </form>
  );
};

export default BudgetForm;

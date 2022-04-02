import { propsToClassKey } from "@mui/styles";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const budgetInitialState = {
  budgets: [],
};

// Actions
export const getBudgetsAsyn = createAsyncThunk(
  "budgets/getBudgetsAsyn",
  async () => {
    const resp = await fetch("http://172.21.148.163/api/v1/budget", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    if (resp.ok) {
      const budgets = await resp.json();
      return { budgets };
    }
  }
);
export const addBudgetAsyn = createAsyncThunk(
  "budgets/addBudgetAsyn",
  async (budget) => {
    var data = JSON.stringify({
      category: budget.category,
      amount: parseFloat(budget.amount),
      period_start_date: budget.period_start_date,
      period_end_date: budget.period_end_date,
    });
    // console.log(data);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
      body: data,
    };
    const response = await fetch(
      "http://172.21.148.163/api/v1/budget",
      requestOptions
    );

    const newbudget = await response.json();
    return { newbudget };
  }
);
export const deleteBudgetAsyn = createAsyncThunk(
  "budgets/deleteBudgetAsyn",
  async (budget_id) => {
    const resp = await fetch(
      `http://172.21.148.163/api/v1/budget/${budget_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      }
    );
    if (resp.ok) {
      // const budget = resp.json();
      return { budget_id };
    }
  }
);
export const editBudgetAsyn = createAsyncThunk(
  "budgets/editBudgetAsyn",
  async (budget) => {
    var data = JSON.stringify({
      budget_key: budget.id,
      amount: parseFloat(budget.amount),
      period_start_date: budget.start,
      period_end_date: budget.end,
      category: budget.category,
    });

    console.log(`Edit request body: ${data}`);

    const requestOptions = {
      method: "PUT", //is this correct?
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
      body: data,
    };
    const resp = await fetch("http://172.21.148.163/api/v1/budget", requestOptions)
    if (resp.ok) {
      const editedbudget = await resp.json();
      return { editedbudget };
    } 
  }
);
// Reducer
export const BudgetSlice = createSlice({
  name: "budgets",
  initialState: budgetInitialState,
  reducers: {},
  extraReducers: {
    [getBudgetsAsyn.fulfilled]: (state, action) => {
      state.budgets = action.payload.budgets;
    },
    [addBudgetAsyn.fulfilled]: (state, action) => {
      console.log(action);
      state.budgets = [...state.budgets, action.payload.newbudget];
      toast("Budget successfully added! ", {
        autoClose: 750,
      });
    },
    [deleteBudgetAsyn.fulfilled]: (state, action) => {
      let filteredata = state.budgets.filter(
        (elem) => elem.budget_key !== action.payload.budget_id
      );
      state.budgets = filteredata;
      toast("Budget successfully deleted!", {
        autoClose: 750,
      });
    },
    [editBudgetAsyn.fulfilled]: (state, action) => {
      let index = state.budgets.findIndex(
        (elem) =>
          elem.budget_key ===
          action.payload.editedbudget.budget_key
      );
      state.budgets[index] = action.payload.editedbudget;
      toast("Budget successfully updated!", {
        autoClose: 750,
      });
    },
  },
});
export const BudgetActions = BudgetSlice.actions;
export default BudgetSlice.reducer;

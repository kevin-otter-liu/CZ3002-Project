import { propsToClassKey } from "@mui/styles";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const transactionInitialState = {
  transactions: [],
};


export const selectAllTransactions = (state) => state.transactions;

// Actions
export const getTransactionsAsyn = createAsyncThunk(
  "transactions/getTransactionsAsyn",
  async () => {
    const resp = await fetch("http://172.21.148.163/api/v1/transaction", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    if (resp.ok) {
      const transactions = await resp.json();
      return { transactions };
    }
  }
);
export const addTransactionAsyn = createAsyncThunk(
  "transactions/addTransactionAsyn",
  async (transaction) => {
    var data = JSON.stringify({
      description: transaction.description,
      type: transaction.type,
      category: transaction.category,
      amount: parseFloat(transaction.amount),
      currency: "SGD",
      payment_method: "cash",
    });
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
      body: data,
    };
    const response = await fetch(
      "http://172.21.148.163/api/v1/transaction",
      requestOptions
    );

    const newtransaction = await response.json();
    console.log(newtransaction);
    return { newtransaction };
  }
);
export const deleteTransactionAsyn = createAsyncThunk(
  "transactions/deleteTransactionAsyn",
  async (transaction_id) => {
    console.log(transaction_id);
    const resp = await fetch(
      `http://172.21.148.163/api/v1/transaction/${transaction_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      }
    );
    if (resp.ok) {
      // const transaction = resp.json();
      return { transaction_id };
    }
  }
);
export const editTransactionAsyn = createAsyncThunk(
  "transactions/editTransactionAsyn",
  async (transaction) => {
    var data = JSON.stringify({
      transaction_key: transaction.id,
      description: transaction.description,
      type: transaction.type,
      category: transaction.category,
      amount: parseFloat(transaction.amount),
      currency: "SGD",
    });

    console.log(`Edit request body: ${data}`);
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
      body: data,
    };
    const resp = await fetch("http://172.21.148.163/api/v1/transaction", requestOptions)
    if (resp.ok) {
      const editedTransaction = await resp.json();
      return { editedTransaction };
    } 
  }
);
// Reducer
export const TransactionSlice = createSlice({
  name: "transactions",
  initialState: transactionInitialState,
  reducers: {},
  extraReducers: {
    [getTransactionsAsyn.fulfilled]: (state, action) => {
      state.transactions = action.payload.transactions;
    },
    [addTransactionAsyn.fulfilled]: (state, action) => {
      console.log(action);
      state.transactions = [...state.transactions, action.payload.newtransaction];
    },
    [deleteTransactionAsyn.fulfilled]: (state, action) => {
      console.log("Fulfilled" + `transactinon_key ${action.payload.transaction_id}`);
      let filteredata = state.transactions.filter(
        (elem) => elem.transaction_key !== action.payload.transaction_id
      );
      state.transactions = filteredata;
    },
    [editTransactionAsyn.fulfilled]: (state, action) => {
      let index = state.transactions.findIndex(
        (elem) =>
          elem.transaction_key ===
          action.payload.editedTransaction.transaction_key
      );
      console.log(`index: ${index}`);
      state[index] = action.payload.transaction;
    },
  },
});
export const TransactionActions = TransactionSlice.actions;
export default TransactionSlice.reducer;

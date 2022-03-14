import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const transactionInitialState = {
  transactions: [],
};

// Action
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
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
      body: data,
    };

    fetch("http://172.21.148.163/api/v1/transaction", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const transaction = isJson && (await response.json());
        console.log(transaction);

        return { transaction };
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
);

export const deleteTransactionAsyn = createAsyncThunk(
  'transactions/deleteTransactionAsyn',
  async(transaction) => {
    const resp = await fetch(`http://172.21.148.163/api/v1/transaction/${transaction.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    if (resp.ok) {
      return {id: transaction.id};
    }
  }
);

export const editTransactionAsyn = createAsyncThunk(
  "transactions/editTransactionAsyn",
  async (transaction, id) => {
    var data = JSON.stringify({
      transaction_key: id,
      description: transaction.description,
      type: transaction.type,
      category: transaction.category,
      amount: parseFloat(transaction.amount),
      currency: "SGD",
    });

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        "Content-Type": "application/json",
      },
      body: data,
    };

    fetch("http://172.21.148.163/api/v1/transaction", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const transaction = isJson && (await response.json());
        console.log(transaction);

        return { transaction };
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
);

// Reducer
export const TransactionSlice = createSlice({
  name: "transactions",
  initialState: transactionInitialState,
  reducers: {},
  extraReducers: {
    [getTransactionsAsyn.fulfilled]: (state, action) => {
      return action.payload.transactions;
    },
    [addTransactionAsyn.fulfilled]: (state, action) => {
      state.push(action.payload.transaction);
    },
    [deleteTransactionAsyn.fulfilled]: (state, action) => {
      return state.filter((transaction) => transaction.id !== action.payload.transaction.id);
    },
    [editTransactionAsyn.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (transaction) => transaction.transaction_key === action.payload.transaction.transaction_key
      );
      state[index] = action.payload.transaction;
    },
  },
});

export const TransactionActions = TransactionSlice.actions;
export default TransactionSlice.reducer;

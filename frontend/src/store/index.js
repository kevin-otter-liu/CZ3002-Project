import { combineReducers, createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from 'redux-thunk'

import AuthenticationReducer from "./Authentication";
import transactionReducer from "./Transaction";
import budgetReducer from "./Budget";

// ==============================|| REDUX - MAIN STORE ||============================== //

const allReducers = combineReducers({
  main: reducer,
  authentication: AuthenticationReducer,
  transaction: transactionReducer,
  budget: budgetReducer,
});

const store = createStore(allReducers, applyMiddleware(thunk));
const persister = "Free";

export { store, persister };


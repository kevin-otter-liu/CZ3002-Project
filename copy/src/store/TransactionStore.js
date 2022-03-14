import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './Transaction';

export default configureStore({
    reducer: {
        transactions: transactionReducer,
    },
});

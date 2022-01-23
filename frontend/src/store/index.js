import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './Authentication';

const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
  },
});

export default store;

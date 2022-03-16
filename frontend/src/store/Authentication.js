import { createSlice } from '@reduxjs/toolkit';

const authenticationInitialState = {
  isAuthenticated: false,
  token: null,
};
const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: authenticationInitialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export default AuthenticationSlice.reducer;

export const AuthenticationActions = AuthenticationSlice.actions;
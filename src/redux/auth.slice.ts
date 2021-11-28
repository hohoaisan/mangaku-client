import {createSlice} from '@reduxjs/toolkit';

import {User} from 'types/auth';

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: state => {
      state.isLoading = false;
    },
    loginPending: state => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailed: state => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    logout: state => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {init, loginPending, loginSuccess, loginFailed, logout} =
  authSlice.actions;

export default authSlice.reducer;

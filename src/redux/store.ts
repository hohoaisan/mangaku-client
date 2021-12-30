import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import authSliceReducer from './auth.slice';

// import counterSliceReducer from './counterSlice';

export const store = configureStore({
  reducer: combineReducers({
    auth: authSliceReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

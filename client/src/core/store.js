import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import apiSlice from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';

const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'api/subscriptions/unsubscribeQueryResult') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware().concat(apiSlice.middleware)],
});

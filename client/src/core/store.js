import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import apiSlice from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';

const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  // Todo Do auth0 logins
  // Todo do token expiration and refresh the access token on expiration
  // Todo persist login
  // Todo  upload profile img to cloudinary to retrieve it later
  if (action.type === 'api/subscriptions/unsubscribeQueryResult') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware().concat(apiSlice.middleware)],
});

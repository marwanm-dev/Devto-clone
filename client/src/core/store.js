import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiSlice from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import postsReducer from './features/posts/postsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
// Todo Always persisted.. but you need to refresh access token whenever its expired (semi-done) and if the refresh token expired must be logged out .. problem is that the cookie cannot be created!
const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  posts: postsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'api/subscriptions/unsubscribeQueryResult') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

let persistor = persistStore(store);

export default store;
export { persistor };

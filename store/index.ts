import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';

import userReducer from './slice/user';

const rootReducer = combineReducers({
  // reducers of different module
  user: userReducer,
});

const persistConfig = {
  key: 'turo',
  version: 1,
  storage,
  // blacklist: ['user'], // blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

const store = makeStore();

export const persistor = persistStore(store);

export const dispatch = store.dispatch;
export const getState = store.getState;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;

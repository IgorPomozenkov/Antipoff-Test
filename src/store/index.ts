import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import authSlicer from './auth/slicer';
import usersSlicer from './users/slicer';
import API from '@/services/api';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'], //'users'
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authed'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlicer),
  users: usersSlicer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const api = new API();

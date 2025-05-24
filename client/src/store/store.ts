import storage from 'redux-persist/lib/storage';
import {
  combineReducers,
  configureStore,
  type Reducer,
  type Store,
} from '@reduxjs/toolkit';
import { api } from './api';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import authReducer from '../modules/auth/reducers/auth.reducer';
import logoutReducer from '../modules/auth/reducers/logout.reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['clientApi', '_persist'],
};

export const combineReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authUser: authReducer,
  logout: logoutReducer,
  // buyer: buyerReducer,
  // seller: sellerReducer,
  // header: headerReducer,
  // showCategoryContainer: categoryReducer,
  // notification: notificationReducer
});

export const rootReducers: Reducer<RootState> = (state, action) => {
  // this is to reset the state to default when user logs out
  if (action.type === 'logout/logout') {
    state = {} as RootState;
  }
  return combineReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store: Store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedsSlice } from './slices/feedsSlice/feedsSlice';
import { userSlice } from './slices/userSlice/userSlice';
import { orderSlice } from './slices/orderSlice/orderSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  feedsSlice,
  userSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

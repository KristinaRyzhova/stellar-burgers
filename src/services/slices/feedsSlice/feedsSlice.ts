import { TOrder } from '@utils-types';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IFeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  (number: number) => getOrderByNumberApi(number).then((data) => data.orders)
);

export const fetchGetUserOrders = createAsyncThunk(
  'user/fetchGetUserOrders',
  getOrdersApi
);

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchGetUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchGetUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      });
  },
  selectors: {
    selectorOrders: (state) => state.orders,
    selectorTotalOrders: (state) => state.total,
    selectorTodayOrders: (state) => state.totalToday,
    selectorIsLoading: (state) => state.isLoading
  }
});

export const {
  selectorOrders,
  selectorTotalOrders,
  selectorTodayOrders,
  selectorIsLoading
} = feedsSlice.selectors;

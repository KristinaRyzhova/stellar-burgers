import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../../utils/burger-api';
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

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const data = await getFeedsApi();
  return data;
});

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectorOrders: (state) => state.orders,
    selectorTotalOrders: (state) => state.total,
    selectorTodayOrders: (state) => state.totalToday,
    selectorIsLoading: (state) => state.isLoading
  },
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
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      });
  }
});

export const {
  selectorOrders,
  selectorTotalOrders,
  selectorTodayOrders,
  selectorIsLoading
} = feedsSlice.selectors;

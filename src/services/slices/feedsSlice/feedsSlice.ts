import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IFeedsState {
  feed: TOrdersData;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IFeedsState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feed/fetchFeeds',
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectorFeed: (state: IFeedsState) => state.feed,
    selectorOrders: (state: IFeedsState) => state.feed.orders,
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
        state.feed = action.payload;
        state.isLoading = false;
      });
  }
});

export const { selectorFeed, selectorOrders, selectorIsLoading } =
  feedsSlice.selectors;

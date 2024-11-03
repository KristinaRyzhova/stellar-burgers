import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../../utils/types';
import { getOrderByNumberApi } from '../../../utils/burger-api';

export interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
  orderByNumber: TOrder | null;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  orderByNumber: null,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'getOrder',
  getOrderByNumberApi
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectOrderByNumber: (sliceState) => sliceState.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.orderByNumber = null;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderByNumber = action.payload.orders[0];
      });
  }
});

export const { selectIsLoading, selectOrders, selectOrderByNumber } =
  orderSlice.selectors;
export default orderSlice.reducer;

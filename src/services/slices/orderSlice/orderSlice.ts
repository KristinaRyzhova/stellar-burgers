import { TOrder } from '@utils-types';
import { getOrderByNumberApi, orderBurgerApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
}

export const initialState: IOrderState = {
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null,
  isModalOpen: false
};

export const fetchCreateOrder = createAsyncThunk(
  'order/fetchCreateOrder',
  (data: string[]) => orderBurgerApi(data)
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.orders[0];
        state.orderRequest = false;
        state.error = null;
      })
      .addCase(fetchCreateOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchCreateOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { closeModal } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;

export const selectorOrderRequest = (state: { order: IOrderState }) =>
  state.order.orderRequest;
export const selectorOrderModalData = (state: { order: IOrderState }) =>
  state.order.orderModalData;
export const selectorIsLoading = (state: { order: IOrderState }) =>
  state.order.isLoading;
export const selectorOrder = (state: { order: IOrderState }) => state.order;

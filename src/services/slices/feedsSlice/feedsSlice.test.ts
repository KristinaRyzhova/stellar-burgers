import { TOrder } from '@utils-types';
import {
  feedsSlice,
  fetchFeeds,
  fetchGetUserOrders,
  initialState
} from './feedsSlice';

const testOrder: TOrder = {
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa0949',
    '643d69a5c3f7b9001cfa093c'
  ],
  _id: '671e3841d829be001c7792b3',
  status: 'done',
  name: 'Краторный экзо-плантаго минеральный люминесцентный бургер',
  number: 57770,
  createdAt: '2024-09-15T15:00:28.967Z',
  updatedAt: '2024-10-27T12:55:30.201Z'
};

describe('Тесты редюсера feedsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const state = feedsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен установить isLoading в true на fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен установить данные и isLoading в false на fetchFeeds.fulfilled', () => {
    const payload = {
      orders: [testOrder],
      total: 10,
      totalToday: 3
    };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchFeeds.rejected', () => {
    const error = { message: 'Ошибка сети' };
    const action = { type: fetchFeeds.rejected.type, error };
    const state = feedsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('должен установить isLoading в true на fetchGetUserOrders.pending', () => {
    const action = { type: fetchGetUserOrders.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обновить заказы и установить isLoading в false на fetchGetUserOrders.fulfilled', () => {
    const action = {
      type: fetchGetUserOrders.fulfilled.type,
      payload: [testOrder]
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([testOrder]);
  });

  it('должен установить ошибку и isLoading в false на fetchGetUserOrders.rejected', () => {
    const error = { message: 'Ошибка сети' };
    const action = { type: fetchGetUserOrders.rejected.type, error };
    const state = feedsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });
});

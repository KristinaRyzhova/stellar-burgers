import { TOrder } from '@utils-types';
import reducer, {
  fetchOrderByNumber,
  initialState,
  orderSlice
} from './orderSlice';

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

describe('Тесты редюсера orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен установить isLoading в true при начале запроса', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      orderByNumber: null,
      error: null
    });
  });

  it('должен установить ошибку при неудачном выполнении запроса', () => {
    const error = { message: 'Ошибка сети' };
    const action = { type: fetchOrderByNumber.rejected.type, error };
    const state = orderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('должен сохранять состояние при запросе без данных', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: {
        orders: [testOrder]
      }
    };

    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orderByNumber).toEqual(testOrder);
    expect(state.error).toBe(null);
  });
});

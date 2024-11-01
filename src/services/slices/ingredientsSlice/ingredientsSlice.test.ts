import {
  ingredientsSlice,
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const testIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
};

describe('Тесты редюсера ingredientsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен установить isLoading в true на fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен установить данные и isLoading в false на fetchIngredients.fulfilled', () => {
    const payload = [testIngredient];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: payload,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchIngredients.rejected', () => {
    const error = { message: 'Ошибка сети' };
    const action = { type: fetchIngredients.rejected.type, error };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });
});

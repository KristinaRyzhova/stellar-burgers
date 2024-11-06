import { rootReducer } from '../store';
import { initialState as ingredientsInitialState } from '../slices/ingredientsSlice/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from '../slices/burgerConstructorSlice/burgerConstructorSlice';
import { initialState as feedsInitialState } from '../slices/feedsSlice/feedsSlice';
import { initialState as userInitialState } from '../slices/userSlice/userSlice';
import { initialState as orderInitialState } from '../slices/orderSlice/orderSlice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние для неопознанного действия', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual({
      ingredients: ingredientsInitialState,
      order: burgerConstructorInitialState,
      feed: feedsInitialState,
      user: userInitialState,
      orderByNum: orderInitialState
    });
  });
});

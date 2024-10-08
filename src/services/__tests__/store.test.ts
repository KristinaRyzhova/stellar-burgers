import { rootReducer } from '../store';
import { initialState as feedInitialState } from '../slices/feedsSlice/feedsSlice';
import { initialState as ingredientsInitialState } from '../slices/ingredientsSlice/ingredientsSlice';
import { initialState as userInitialState } from '../slices/userSlice/userSlice';
import { initialState as orderInitialState } from '../slices/burgerConstructorSlice/burgerConstructorSlice';

describe('rootReducer', () => {
  it('тест проверяющий правильную настройку и работу rootReducer: вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером, возвращает корректное начальное состояние хранилища', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const initialState = {
      feed: feedInitialState,
      ingredients: ingredientsInitialState,
      user: userInitialState,
      order: orderInitialState
    };

    const state = rootReducer(undefined, action);

    expect(state).toEqual(initialState);
  });
});

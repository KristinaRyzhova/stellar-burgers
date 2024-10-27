import { TUser } from '@utils-types';
import {
  userSlice,
  fetchRegisterUser,
  fetchLoginUser,
  fetchGetUser,
  fetchUpdateUser,
  fetchLogoutUser,
  initialState
} from './userSlice';

const testUser: TUser = {
  email: 'email@email.com',
  name: 'userName'
};

describe('Тесты редюсера userSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен установить isLoading в true на fetchRegisterUser.pending', () => {
    const action = { type: fetchRegisterUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен установить данные пользователя и isLoading в false на fetchRegisterUser.fulfilled', () => {
    const payload = { user: testUser };
    const action = { type: fetchRegisterUser.fulfilled.type, payload };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: payload.user,
      isAuthChecked: true,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchRegisterUser.rejected', () => {
    const error = { message: 'Ошибка регистрации' };
    const action = { type: fetchRegisterUser.rejected.type, error };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('должен установить isLoading в true на fetchLoginUser.pending', () => {
    const action = { type: fetchLoginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен установить данные пользователя и isLoading в false на fetchLoginUser.fulfilled', () => {
    const payload = { user: testUser };
    const action = { type: fetchLoginUser.fulfilled.type, payload };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: payload.user,
      isAuthChecked: true,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchLoginUser.rejected', () => {
    const error = { message: 'Ошибка входа' };
    const action = { type: fetchLoginUser.rejected.type, error };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });

  it('должен установить isLoading в true на fetchGetUser.pending', () => {
    const action = { type: fetchGetUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthChecked).toBe(false);
  });

  it('должен установить данные пользователя и isLoading в false на fetchGetUser.fulfilled', () => {
    const payload = { user: testUser };
    const action = { type: fetchGetUser.fulfilled.type, payload };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: payload.user,
      isAuthChecked: true,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchGetUser.rejected', () => {
    const error = { message: 'Ошибка получения пользователя' };
    const action = { type: fetchGetUser.rejected.type, error };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
    expect(state.isAuthChecked).toBe(false);
  });

  it('должен установить isLoading в true на fetchUpdateUser.pending', () => {
    const action = { type: fetchUpdateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обновить данные пользователя и установить isLoading в false на fetchUpdateUser.fulfilled', () => {
    const payload = { user: testUser };
    const action = { type: fetchUpdateUser.fulfilled.type, payload };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: payload.user,
      isAuthChecked: true,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchUpdateUser.rejected', () => {
    const error = { message: 'Ошибка обновления' };
    const action = { type: fetchUpdateUser.rejected.type, error };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
    expect(state.isAuthChecked).toBe(false);
  });

  it('должен установить isLoading в true на fetchLogoutUser.pending', () => {
    const action = { type: fetchLogoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен очистить пользователя и установить isLoading в false на fetchLogoutUser.fulfilled', () => {
    const action = { type: fetchLogoutUser.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: null,
      isAuthChecked: false,
      error: null
    });
  });

  it('должен установить ошибку и isLoading в false на fetchLogoutUser.rejected', () => {
    const error = { message: 'Ошибка выхода' };
    const action = { type: fetchLogoutUser.rejected.type, error };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error.message);
  });
});

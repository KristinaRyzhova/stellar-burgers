describe('Тесты редюсера orderSlice', () => {
  it('должен установить isLoading в true на fetchOrderByNumber.pending', () => {});

  it('должен обновить заказы и установить isLoading в false на fetchOrderByNumber.fulfilled', () => {});

  it('должен установить ошибку и isLoading в false на fetchOrderByNumber.rejected', () => {});
});

/* it('должен установить isLoading в true на fetchGetUserOrders.pending', () => {
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
}); */

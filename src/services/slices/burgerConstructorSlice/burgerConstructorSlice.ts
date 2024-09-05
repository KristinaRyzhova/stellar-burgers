import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export interface IBurgerConstructor {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: IBurgerConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    selectorConstructorItems: (state) => state.constructorItems,
    selectorOrderRequest: (state) => state.orderRequest,
    selectorOrderModalData: (state) => state.orderModalData
  }
});

export default burgerConstructorSlice.reducer;

export const {
  selectorConstructorItems,
  selectorOrderRequest,
  selectorOrderModalData
} = burgerConstructorSlice.selectors;

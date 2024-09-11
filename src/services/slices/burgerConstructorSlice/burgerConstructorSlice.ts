import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export interface IBurgerConstructor {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[] | [];
  isLoading: boolean;
  error: string | null;
}

export const initialState: IBurgerConstructor = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orders: [],
  isLoading: false,
  error: null
};

export const fetchCreateOrder = createAsyncThunk(
  'order/сreateOrder',
  async (data: string[]) => {
    const result = await orderBurgerApi(data);
    return result;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  (data: number) => getOrderByNumberApi(data)
);

export const fetchUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

export const burgerConstructorSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    upIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index > 0) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index - 1]] = [
          newIngredients[index - 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    },

    downIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index < ingredients.length - 1) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index + 1]] = [
          newIngredients[index + 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    },
    resetConstructor: () => initialState
  },
  selectors: {
    selectorConstructorItems: (state) => state.constructorItems,
    selectorOrderRequest: (state) => state.orderRequest,
    selectorOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchCreateOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.orders[0];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export default burgerConstructorSlice.reducer;

export const {
  selectorConstructorItems,
  selectorOrderRequest,
  selectorOrderModalData
} = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;

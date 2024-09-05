import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient } from '@utils-types';

export const ingredientsThunk = createAsyncThunk(
  'ingredients/ingredientsThunk',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

export interface ingredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ingredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectorIngredients: (state) => state.ingredients,
    selectorIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ingredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(ingredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  }
});

export const { selectorIngredients, selectorIsLoading } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;

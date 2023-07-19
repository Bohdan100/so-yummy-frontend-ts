import { createSlice, AnyAction, Reducer } from '@reduxjs/toolkit';
import { getOwnRecipes, deleteOwnRecipe } from './ownRecipesOperations';

import { IOwnRecipesState } from 'types';

const initialState: IOwnRecipesState = {
  isLoading: false,
  ownRecipes: [],
  total: 0,
  error: null,
};

const ownRecipesSlice = createSlice({
  name: 'ownRecipes',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getOwnRecipes.fulfilled, (state, action) => {
        state.ownRecipes = action.payload.ownRecipes;
        state.total = action.payload.total;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOwnRecipes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOwnRecipes.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(deleteOwnRecipe.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOwnRecipe.fulfilled, (state, action) => {
        const index = state.ownRecipes.findIndex(
          recipe => recipe._id === action.payload.recipeId
        );
        state.ownRecipes.splice(index, 1);
        state.isLoading = false;
        state.error = null;
      })

      .addCase(deleteOwnRecipe.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      }),
});
export const ownRecipesReduсer = ownRecipesSlice.reducer as Reducer<
  IOwnRecipesState,
  AnyAction
>;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getOwnRecipes } from './ownRecipesOperations';

import { IOwnRecipesState } from 'types/reduxTypes';

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
        state.error = action.payload;
      }),
  // .addCase(addOwnRecipe.rejected, (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // })
  // .addCase(deleteOwnRecipe.rejected, (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // }),
});
export const ownRecipesReduser = ownRecipesSlice.reducer;

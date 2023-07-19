import { RootState } from 'redux/store';

export const getOwnRecipesList = (state: RootState) =>
  state.ownRecipes.ownRecipes;
export const getTotalOwnRecipes = (state: RootState) => state.ownRecipes.total;
export const selectIsLoading = (state: RootState) => state.ownRecipes.isLoading;

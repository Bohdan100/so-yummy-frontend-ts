import { RootState } from 'redux/store';

export const selectProducts = (state: RootState) => state.shoppingList.items;
export const selectIsLoading = (state: RootState) =>
  state.shoppingList.isLoading;
export const selectError = (state: RootState) => state.shoppingList.error;

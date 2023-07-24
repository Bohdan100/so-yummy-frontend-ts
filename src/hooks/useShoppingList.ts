import { useAppSelector } from 'hooks/reduxHooks';
import {
  selectProducts,
  selectIsLoading,
  selectError,
} from 'redux/ShoppingList/shoppingListSelectors';

export const useShoppingList = () => {
  return {
    products: useAppSelector(selectProducts),
    isLoading: useAppSelector(selectIsLoading),
    error: useAppSelector(selectError),
  };
};

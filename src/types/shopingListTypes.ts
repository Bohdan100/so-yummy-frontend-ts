import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from 'redux/ShoppingList/shoppingListOperations';
import { logout } from 'redux/Auth/authOperations';

export interface IShoppingListState {
  items: IProduct[];
  isLoading: boolean;
  error: null | string;
}

export interface IProduct {
  _id: string;
  owner: string;
  strIngredient: string;
  weight: string;
  image: string;
  recipeId: string;
}

export interface IProductDeleteResponse {
  status: string;
  code: number;
  id: string;
  message: string;
}

export type ShoppingListExtraActions = (
  | typeof fetchProducts
  | typeof addProduct
  | typeof deleteProduct
  | typeof logout
)[];

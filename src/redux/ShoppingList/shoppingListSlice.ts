import {
  PayloadAction,
  createSlice,
  isAnyOf,
  AnyAction,
  Reducer,
} from '@reduxjs/toolkit';
import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from './shoppingListOperations';
import { logout } from '../Auth/authOperations';
import { getActions, isError } from 'redux/helpersRedux';
import { IShoppingListState, ShoppingListExtraActions } from 'types';

const extraActions: ShoppingListExtraActions = [
  fetchProducts,
  addProduct,
  deleteProduct,
  logout,
];

const initialState: IShoppingListState = {
  items: [],
  isLoading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const index = state.items.findIndex(
          item => item._id === action.payload.id
        );

        state.items.splice(index, 1);
      })
      .addCase(logout.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
        state.items = [];
      })
      .addMatcher(
        isAnyOf(
          fetchProducts.pending,
          addProduct.pending,
          deleteProduct.pending,
          logout.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(getActions('fulfilled', extraActions), state => {
        state.error = null;
        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      }),
});

export const shoppingListReducer = shoppingListSlice.reducer as Reducer<
  IShoppingListState,
  AnyAction
>;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getProducts,
  addProductAPI,
  deleteProductAPI,
} from 'services/products-API';
import { AsyncThunkConfig, IProduct, IProductDeleteResponse } from 'types';

export const fetchProducts = createAsyncThunk<
  IProduct[],
  undefined,
  AsyncThunkConfig
>('products/fetchAllProducts', async (_, thunkAPI) => {
  try {
    const data = await getProducts();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue('Get all products failed');
  }
});

export const addProduct = createAsyncThunk<
  IProduct,
  Omit<IProduct, 'owner' | '_id'>,
  AsyncThunkConfig
>('products/addProduct', async (body, thunkAPI) => {
  try {
    const data = await addProductAPI(body);

    toast.success(
      `Ingredient ${body.strIngredient}  is added to the shopping list`
    );
    return data;
  } catch (error) {
    toast.error(`Something went wrong. Try again...`);
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Add product failed ');
  }
});

export const deleteProduct = createAsyncThunk<
  IProductDeleteResponse,
  { id: string },
  AsyncThunkConfig
>('products/deleteProduct', async ({ id }, thunkAPI) => {
  try {
    const data = await deleteProductAPI(id);
    toast.success(`The  ingredient has been removed from the shopping list`);
    return data;
  } catch (error) {
    toast.error(`Something went wrong. Try again...`);
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue('Delete product failed ');
  }
});

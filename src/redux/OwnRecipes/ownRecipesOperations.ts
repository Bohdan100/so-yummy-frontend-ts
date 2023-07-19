import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes, deleteRecipe } from '../../services/own-API';
import {
  AsyncThunkConfig,
  IOwnRecipesActionPayload,
  IOwnRecipeDeleteResponse,
} from 'types';

export const getOwnRecipes = createAsyncThunk<
  IOwnRecipesActionPayload,
  { page: number; limit: number },
  AsyncThunkConfig
>('ownRecipes/getOwnRecipes', async ({ page, limit }, thunkAPI) => {
  try {
    const response = await getRecipes(page, limit);

    return { ownRecipes: response.data.result, total: response.total };
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue('Get own recipes failed');
  }
});

export const deleteOwnRecipe = createAsyncThunk<
  IOwnRecipeDeleteResponse,
  { recipeId: string },
  AsyncThunkConfig
>('ownRecipes/deleteOwnRecipe', async ({ recipeId }, thunkAPI) => {
  try {
    const data = await deleteRecipe(recipeId);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return thunkAPI.rejectWithValue('Delete recipe failed');
  }
});

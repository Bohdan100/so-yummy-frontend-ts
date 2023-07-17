import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes, addRecipe, deleteRecipe } from '../../services/own-API';
import { AsyncThunkConfig, IOwnRecipesActionPayload } from 'types/reduxTypes';

// export const getOwnRecipes = createAsyncThunk<>(
//   'ownRecipes/getOwnRecipes',
//   async ({ page, limit }, { rejectWithValue }) => {
//     try {
//       const data = await getRecipes(page ?? null, limit ?? null);
//       return { ownRecipes: data.data.result, total: data.total };
//     } catch (error) {
//       return rejectWithValue(error.response.status);
//     }
//   }
// );

export const getOwnRecipes = createAsyncThunk<
  IOwnRecipesActionPayload,
  { page: string; limit: string },
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

// @ts-ignore
// export const addOwnRecipe = createAsyncThunk(
//   'ownRecipes/addOwnRecipe',
//   async ({ body, cb }, { rejectWithValue }) => {
//     try {
//       const data = await addRecipe(body);
//       cb();
//       return data;
//     } catch (error) {
// @ts-ignore
//       return rejectWithValue(error.response.status);
//     }
//   }
// );

// export const deleteOwnRecipe = createAsyncThunk(
//   'ownRecipes/deleteOwnRecipe',
//   async (recipeId, { rejectWithValue }) => {
//     try {
//       const data = await deleteRecipe(recipeId);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.status);
//     }
//   }
// );

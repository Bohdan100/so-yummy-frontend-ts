import axios, { AxiosResponse } from 'axios';
import {
  IOwnRecipesGetResponse,
  IFormDataAddRecipe,
  IOwnRecipeCreateResponse,
} from 'types';

export const getRecipes = async (page?: number, limit?: number) => {
  if (page && limit) {
    const { data }: AxiosResponse<IOwnRecipesGetResponse> = await axios(
      `/ownRecipe?page=${page}&limit=${limit}`
    );

    return data;
  }
  const { data }: AxiosResponse<IOwnRecipesGetResponse> = await axios(
    `/ownRecipe`
  );
  return data;
};

export const addRecipe = async (formData: IFormDataAddRecipe) => {
  const { data }: AxiosResponse<IOwnRecipeCreateResponse> = await axios.post(
    '/ownRecipe',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};

export const deleteRecipe = async (recipeId: string) => {
  const { data }: AxiosResponse<{ message: string }> = await axios.delete(
    `/ownRecipe/${recipeId}`
  );

  return {
    message: data.message,
    recipeId,
  };
};

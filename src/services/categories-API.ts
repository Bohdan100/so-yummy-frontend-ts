import axios, { AxiosResponse } from 'axios';
import {
  ICategoriesResponse,
  IRecipesByCategoryResponse,
  IRecipesByFourCatResponse,
} from 'types';

export const fetchAllCategories = async () => {
  const { data }: AxiosResponse<ICategoriesResponse> = await axios.get(
    `/recipes/category-list`
  );
  return data;
};

export const fetchRecipesByCategory = async (
  categoryName: string | undefined,
  limit: number = 8,
  page: number = 1
) => {
  const { data }: AxiosResponse<IRecipesByCategoryResponse> = await axios.get(
    `/recipes/categories/${categoryName}?limit=${limit}&page=${page}`
  );
  return data;
};

export const fetchRecipesByFourCategory = async (count: number = 1) => {
  const { data }: AxiosResponse<IRecipesByFourCatResponse> = await axios.get(
    `/recipes?count=${count}`
  );
  return data;
};

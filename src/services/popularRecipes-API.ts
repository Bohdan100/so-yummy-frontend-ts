import axios, { AxiosResponse } from 'axios';
import { IPopularRecipesResponse } from 'types';

export const getPopularRecipes = async () => {
  const {
    data: {
      data: { result },
    },
  }: AxiosResponse<IPopularRecipesResponse> = await axios.get(
    '/popular-recipes'
  );
  return result;
};

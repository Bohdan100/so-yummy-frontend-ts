import axios, { AxiosResponse } from 'axios';

import {
  IRecipeGetResponse,
  IIsFavoriteResponse,
  IRemoveRecipeFromFavorites,
  IAddRecipeTоFavorites,
} from 'types';

export const fetchOneRacipes = async (id: string) => {
  const url = `/recipes/${id}`;
  const { data }: AxiosResponse<IRecipeGetResponse> = await axios.get(url);
  return data;
};

// export const fetchOwnRacipes = async () => {
//   const url = `/ownRecipe/`;
//   const { data } = await axios.get(url);
//   return data;
// };

// export const fetchFavoriteRacipes = async (page, limit) => {
//   const url = `/favorite`;
//   const { data } = await axios.get(`${url}?page=${page}&limit=${limit}`);
//   return data;
// };

export const addRecipeTоFavorites = async (id: string) => {
  const url = `/favorite/${id}`;
  const { data }: AxiosResponse<IAddRecipeTоFavorites> = await axios.post(url);
  return data;
};

export const removeRecipeFromFavorites = async (id: string) => {
  const url = `/favorite/${id}`;
  const { data }: AxiosResponse<IRemoveRecipeFromFavorites> =
    await axios.delete(url);
  return data;
};

export const isFavorite = async (id: string) => {
  const url = `favorite/${id}`;
  const { data }: AxiosResponse<IIsFavoriteResponse> = await axios.get(url);
  return data;
};

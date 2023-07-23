import axios, { AxiosResponse } from 'axios';
import { IIngridientFromDB } from 'types';

export const getAllIngredients = async () => {
  const { data }: AxiosResponse<IIngridientFromDB[]> = await axios.get(
    '/ingredients/list'
  );
  return data;
};

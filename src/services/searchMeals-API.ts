import axios, { AxiosResponse } from 'axios';
import { IRetchSearchedMealsResponse } from 'types';

export async function fetchSearchedMeals(searchParams: {}) {
  const response: AxiosResponse<IRetchSearchedMealsResponse> = await axios.get(
    `/search`,
    { params: searchParams }
  );

  return response.data;
}

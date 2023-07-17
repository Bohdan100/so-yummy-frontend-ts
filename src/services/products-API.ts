import axios, { AxiosResponse } from 'axios';
import { IProduct, IProductDeleteResponse } from 'types';

export const getProducts = async () => {
  const { data }: AxiosResponse<IProduct[]> = await axios.get('/shopping-list');
  return data;
};

export const addProductAPI = async (body: Omit<IProduct, 'owner' | '_id'>) => {
  const { data }: AxiosResponse<IProduct> = await axios.post(
    '/shopping-list',
    body
  );
  return data;
};

export const deleteProductAPI = async (id: string) => {
  const { data }: AxiosResponse<IProductDeleteResponse> = await axios.delete(
    `/shopping-list/${id}`
  );
  return data;
};

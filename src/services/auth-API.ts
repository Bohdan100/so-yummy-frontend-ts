import axios, { AxiosResponse } from 'axios';
import {
  IAuthResponse,
  IUser,
  IRefreshUserResponse,
  UpdateUserResponse,
} from 'types';

axios.defaults.baseURL = 'https://so-yummy-98ev.onrender.com/api';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = '';
};

export const createUser = async (
  credentials: Pick<IUser, 'email' | 'name' | 'password'>
) => {
  const { data }: AxiosResponse<IAuthResponse> = await axios.post(
    '/auth/signup',
    credentials
  );
  return data;
};

export const loginUser = async (
  credentials: Pick<IUser, 'email' | 'password'>
) => {
  const { data }: AxiosResponse<IAuthResponse> = await axios.post(
    '/auth/login',
    credentials
  );
  return data;
};

export const logoutUser = async () => {
  await axios.get('/auth/logout');
};

export const refreshUser = async () => {
  const { data }: AxiosResponse<IRefreshUserResponse> = await axios.get(
    '/auth/current'
  );
  return data;
};

export const updateUserInfo = async (credentials: {
  name: string;
  avatar: File | string;
}) => {
  const { data }: AxiosResponse<UpdateUserResponse> = await axios.patch(
    '/auth/edit',
    credentials,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};

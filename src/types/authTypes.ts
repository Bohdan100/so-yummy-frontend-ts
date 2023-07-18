import { register, login, logout, refresh } from 'redux/Auth/authOperations';

export interface IAuthState {
  user: {
    name: null | string;
    email: null | string;
    avatar: null | string;
    userId: null | string;
  };
  token: null | string;
  isLoading: boolean;
  error: null | string;
  isRefreshing: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  userId: string;
}

export interface IAuthResponse {
  status: string;
  code: number;
  data: {
    token: string;
    user: Omit<IUser, 'password'>;
  };
}

export interface IRefreshUserResponse {
  status: string;
  code: number;
  data: {
    name: string;
    email: string;
    avatar: string;
    userId: string;
  };
}

export type UpdateUserResponse = Pick<IAuthResponse, 'status' | 'code'> & {
  data: {
    user: Pick<IUser, 'name' | 'avatar'>;
  };
};

export type AuthExtraActions = (
  | typeof register
  | typeof login
  | typeof logout
  | typeof refresh
)[];

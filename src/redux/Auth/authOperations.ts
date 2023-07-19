import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createUser,
  loginUser,
  logoutUser,
  refreshUser,
  setAuthHeader,
  clearAuthHeader,
  updateUserInfo,
} from 'services/auth-API';

import {
  IAuthResponse,
  IUser,
  AsyncThunkConfig,
  UpdateUserResponse,
} from 'types';

export const register = createAsyncThunk<
  IAuthResponse,
  Pick<IUser, 'email' | 'password' | 'name'>,
  AsyncThunkConfig
>(
  'auth/register',
  async (credentials: Pick<IUser, 'email' | 'password' | 'name'>, thunkAPI) => {
    try {
      const res = await createUser(credentials);
      setAuthHeader(res.data.token);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'Registration failed';
        return thunkAPI.rejectWithValue(errorMessage as string);
      }
    }
  }
);

export const login = createAsyncThunk<
  IAuthResponse,
  Pick<IUser, 'email' | 'password'>,
  AsyncThunkConfig
>(
  'auth/login',
  async (credentials: Pick<IUser, 'email' | 'password'>, thunkAPI) => {
    try {
      const res = await loginUser(credentials);
      setAuthHeader(res.data.token);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'Login failed';
        return thunkAPI.rejectWithValue(errorMessage as string);
      }
    }
  }
);

export const logout = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await logoutUser();
      clearAuthHeader();
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'Logout failed';
        return thunkAPI.rejectWithValue(errorMessage as string);
      }
    }
  }
);

export const refresh = createAsyncThunk<
  Pick<IUser, 'name' | 'email' | 'avatar' | 'userId'>,
  undefined,
  AsyncThunkConfig
>('auth/refresh', async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  if (!token) {
    return thunkAPI.rejectWithValue('Token not found');
  }

  try {
    setAuthHeader(token);
    const { data } = await refreshUser();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || 'Refresh current user failed';
      return thunkAPI.rejectWithValue(errorMessage as string);
    }
  }
});

// export const refresh = createAsyncThunk<
//   Omit<IUser, 'password'>,
//   undefined,
//   AsyncThunkConfig
// >('auth/refresh', async (_, thunkAPI) => {
//   const { token } = thunkAPI.getState().auth;
//   if (!token) {
//     return thunkAPI.rejectWithValue('Token not found');
//   }
//   try {
// setAuthHeader(token);
// const { data } = await refreshUser();
// return data;
//   } catch (error) {
// if (error instanceof Error) {
//   return thunkAPI.rejectWithValue(error.message);
// } else {
//   const errorMessage =
//     (error as { response?: { data?: { message?: string } } })?.response
//       ?.data?.message || 'Refresh current user failed';
//   return thunkAPI.rejectWithValue(errorMessage as string);
// }
//   }
// });

export const updateUser = createAsyncThunk<
  UpdateUserResponse,
  Pick<IUser, 'name' | 'avatar'>,
  AsyncThunkConfig
>(
  '/auth/update',
  async (credentials: Pick<IUser, 'name' | 'avatar'>, thunkAPI) => {
    try {
      const data = await updateUserInfo(credentials);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'Update user failed';
        return thunkAPI.rejectWithValue(errorMessage as string);
      }
    }
  }
);

import {
  createSlice,
  isAnyOf,
  PayloadAction,
  Reducer,
  AnyAction,
} from '@reduxjs/toolkit';
import { register, login, logout, updateUser, refresh } from './authOperations';
import { getActions, isError } from 'redux/helpersRedux';
import { IAuthState, IUser, AuthExtraActions } from 'types';

const extraActions: AuthExtraActions = [register, login, logout, refresh];

const initialState: IAuthState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    userId: null,
  },
  token: null,
  isLoading: false,
  error: null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setGoogleAuth(
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null, avatar: null, userId: null };
        state.token = null;
        state.error = null;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user.name = action.payload.data.user.name;
        state.user.avatar = action.payload.data.user.avatar;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, state => {
        state.isRefreshing = true;
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, action) => {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          state.isRefreshing = false;
        }
      )
      .addMatcher(getActions('pending', extraActions), state => {
        state.isLoading = true;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isRefreshing = false;
      }),
});

export const authReducer = authSlice.reducer as Reducer<IAuthState, AnyAction>;
export const { setError, setGoogleAuth } = authSlice.actions;

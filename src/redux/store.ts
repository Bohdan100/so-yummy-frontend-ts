import {
  configureStore,
  getDefaultMiddleware,
  Reducer,
} from '@reduxjs/toolkit';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

import { authReducer } from './Auth/authSlice';
import { shoppingListReducer } from './ShoppingList/shoppingListSlice';
import { ownRecipesReduсer } from './OwnRecipes/ownRecipesSlice';
import { themeReducer } from './Theme/themeSlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IAuthState } from 'types';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
};
const persistedAuthReducer: Reducer<IAuthState & PersistPartial, AnyAction> =
  persistReducer(authPersistConfig, authReducer);

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    shoppingList: shoppingListReducer,
    ownRecipes: ownRecipesReduсer,
    theme: persistedThemeReducer,
  },

  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, undefined, AnyAction>;

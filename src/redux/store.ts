import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction, Store } from 'redux';

import { authReducer } from './Auth/authSlice';
import { shoppingListReducer } from './ShoppingList/shoppingListSlice';
import { ownRecipesReduser } from './OwnRecipes/OwnRecipesSlice';
import { themeReducer } from './Theme/themeSlice';

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

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

export const store: Store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // shoppingList: shoppingListReducer,
    // ownRecipes: ownRecipesReduser,
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

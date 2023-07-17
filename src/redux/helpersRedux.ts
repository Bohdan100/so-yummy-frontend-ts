import { AuthExtraActions, ShoppingListExtraActions } from 'types';
import { isAnyOf, AnyAction } from '@reduxjs/toolkit';

export const getActions = (
  type: 'pending' | 'rejected' | 'fulfilled',
  extraActions: AuthExtraActions | ShoppingListExtraActions
) => isAnyOf(...extraActions.map(action => action[type]));

export const isError = (action: AnyAction): boolean => {
  return action.type.endsWith('rejected');
};

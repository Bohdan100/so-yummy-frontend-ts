import { ExtraActions } from 'types/reduxTypes';
import { isAnyOf, AnyAction } from '@reduxjs/toolkit';
import { register, login, logout, refresh } from './Auth/authOperations';

const extraActions: ExtraActions = [register, login, logout, refresh];

export const getActions = (type: 'pending' | 'rejected') =>
  isAnyOf(...extraActions.map(action => action[type]));

export const isError = (action: AnyAction): boolean => {
  return action.type.endsWith('rejected');
};

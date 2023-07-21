import { useAppSelector } from 'hooks/reduxHooks';
import {
  selectUser,
  selectIsRefreshing,
  selectError,
  selectToken,
} from 'redux/Auth/authSelectors';

export const useAuth = () => {
  return {
    isRefreshing: useAppSelector(selectIsRefreshing),
    user: useAppSelector(selectUser),
    error: useAppSelector(selectError),
    token: useAppSelector(selectToken),
  };
};

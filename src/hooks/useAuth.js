import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsRefreshing,
  selectError,
  selectToken,
} from 'redux/Auth/authSelectors';

export const useAuth = () => {
  return {
    isRefreshing: useSelector(selectIsRefreshing),
    user: useSelector(selectUser),
    error: useSelector(selectError),
    token: useSelector(selectToken),
  };
};

import { RootState } from 'redux/store';
import { AppDispatch } from 'redux/store';

export interface AsyncThunkConfig {
  state: RootState;
  rejectValue: string;
  serializedErrorType: string;
  dispatch: AppDispatch;
}

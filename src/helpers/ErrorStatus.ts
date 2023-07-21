import { useErrorMessages } from './authValidationSchemas';
import { useTranslation } from 'react-i18next';

export const useErrorStatus = () => {
  const { t } = useTranslation();
  const { ErrorMessages } = useErrorMessages();
  return {
    ErrorStatus: {
      400: t('auth.error.400'),
      401: t('auth.error.401'),
      404: t('auth.error.404'),
      409: t('auth.error.409'),
      500: t('auth.error.500'),
    },
    getPassErrorStatus: (
      error: string,
      dirty: boolean
    ): 'valid' | 'inValid' | 'notSecure' => {
      if (!error && dirty) {
        return 'valid';
      } else if (error === ErrorMessages.password) {
        return 'notSecure';
      } else if (error !== ErrorMessages.password) {
        return 'inValid';
      } else {
        return 'valid';
      }
    },
  };
};

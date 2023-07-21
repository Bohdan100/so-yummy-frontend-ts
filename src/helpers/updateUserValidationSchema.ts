import * as Yup from 'yup';
import { IUpdateUserInfoForm } from 'types';

export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const updateUserSchema = Yup.object().shape({
  avatar: Yup.mixed().test(
    'type',
    'Only PNG, JPEG, and JPG formats are supported',
    function (value) {
      if (!value) return true;
      if (typeof value === 'string') {
        // Handle string type (URL of the avatar)
        return true; // Assuming all strings are valid URLs
      }
      if (value instanceof File) {
        // Handle File type (selected file for upload)
        return SUPPORTED_FORMATS.includes(value.type);
      }
      return false;
    }
  ) as Yup.MixedSchema<string | File | undefined>,
  name: Yup.string()
    .trim()
    .min(1, 'Name must contain at least 2 letters')
    .max(16, 'Name must contain maximum 16 letters')
    .required('Name is required'),
});

export const updateUserValidationSchema: Yup.ObjectSchema<IUpdateUserInfoForm> =
  updateUserSchema as Yup.ObjectSchema<IUpdateUserInfoForm>;

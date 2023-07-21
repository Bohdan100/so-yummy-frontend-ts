import * as Yup from 'yup';

import { IAddFormData } from 'types';

const fileMaxSize = 16777216; // 16MB
const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
const addRecipeSchema = Yup.object().shape({
  preview: Yup.mixed()
    .test('fileType', 'Only picture files are allowed', function (value) {
      const file = value as File;
      if (!file) {
        return true; // Skip the test if no file is selected
      }
      return file && allowedFileTypes.includes(file.type);
    })
    .test('fileSize', 'Picture size is too large', function (value) {
      const file = value as File;
      if (!file) {
        return true; // Skip the test if no file is selected
      }
      return file && file.size <= fileMaxSize;
    }),
  title: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(80, 'Maximum 80 characters')
    .required('Title recipe is required'),
  description: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(200, 'Maximum 200 characters')
    .required('Description recipe is required'),
  category: Yup.string().required('Category recipe is required'),
  time: Yup.string().required('Time recipe is required'),
  ingredients: Yup.array()
    .min(1, 'You need and minimum one ingredient')
    .max(20, 'No more than 20 ingredients')
    .of(
      Yup.object().shape({
        id: Yup.string(),
        measure: Yup.string()
          .min(1, 'You need to add weight')
          .max(10, 'Measure must be less than 999')
          .required('Amount ingredient is required'),
      })
    )
    .required('At least one ingredient is required'),
  instructions: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(2000, 'Maximum 2000 characters')
    .required('Recipe instruction is required'),
});

export const addRecipeValidationSchema =
  addRecipeSchema as Yup.Schema<IAddFormData>;

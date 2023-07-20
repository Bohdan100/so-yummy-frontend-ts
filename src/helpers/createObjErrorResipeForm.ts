import { ValidationError } from 'yup';

export interface IAddFormErrors {
  [key: string]: string | string[];
}

export const createObjErrorResipeForm = (
  acc: IAddFormErrors,
  curr: ValidationError
) => {
  const path = curr.path;

  if (path && path.includes('].')) {
    const el = curr.path;
    if (el) {
      const currPath = el.slice(0, el.indexOf('['));
      const index = +el.slice(el.indexOf('[') + 1, el.indexOf(']'));
      if (!acc[currPath]) {
        acc[currPath] = [];
      }
      const errorArray = acc[currPath] as string[];
      errorArray[index] = curr.message;
    }
  } else if (path) {
    acc[path] = curr.message;
  }
  return acc;
};

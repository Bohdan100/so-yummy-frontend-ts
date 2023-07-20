const save = (key: string, value: any): void | null => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return null;
  }
};

const get = (key: string): any | null => {
  try {
    return JSON.parse(localStorage.getItem(key) as any);
  } catch (error) {
    return null;
  }
};

const remove = (key: string): void | null => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export const storageServices = {
  get,
  save,
  remove,
};

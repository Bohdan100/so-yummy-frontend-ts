export interface IAddFormData {
  preview?: File;
  title: string;
  description: string;
  category: string;
  time: string;
  ingredients: { id: string; measure: string }[];
  instructions: string;
}

export interface IFormErrors {
  title?: string;
  instructions?: string;
  ingredients?: string | string[];
  description?: string;
  preview?: string;
  time?: string;
  category?: string;
}

export interface IIngridient {
  id: string;
  measure: string;
}

export interface IRecipe {
  _id: string;
  category: string;
  description: string;
  favorites: any[];
  ingredients: IIngridient[];
  instructions: string;
  likes: any[];
  owner: string;
  popularity: number;
  preview: string;
  tags: any[];
  thumb: string;
  time: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  youtube: string;
}

export interface IOwnRecipesGetResponse {
  status: string;
  code: number;
  data: {
    result: IRecipe[];
  };
  limit: string;
  page: string;
  total: number;
}

export interface IOwnRecipeDeleteResponse {
  message: string;
}

export interface IFormDataAddRecipe {
  category: string;
  description: string;
  ingredients: IIngridient[];
  instructions: string;
  preview: string | null;
  time: string;
  title: string;
}

export interface IOwnRecipeCreateResponse {
  data: IRecipe;
  message: string;
}

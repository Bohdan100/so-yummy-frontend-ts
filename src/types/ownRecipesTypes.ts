export interface IOwnRecipesState {
  isLoading: boolean;
  ownRecipes: IRecipe[];
  total: number;
  error: null | string;
}

export interface IIngridient {
  id: string;
  measure: string;
}

export interface IRecipe {
  _id: string;
  title: string;
  category: string;
  instructions: string;
  description: string;
  thumb: string;
  preview: string;
  time: string;
  popularity: number;
  likes: any[];
  favorites: any[];
  youtube: string;
  tags: any[];
  ingredients: IIngridient[];
  owner?: string;
  updatedAt: string;
  createdAt: string;
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

export interface IOwnRecipesActionPayload {
  ownRecipes: IRecipe[];
  total: number;
}

export interface IOwnRecipeDeleteResponse {
  message: string;
  recipeId: string;
}

export interface IFormDataAddRecipe {
  category: string;
  description: string;
  ingredients: IIngridient[];
  instructions: string;
  preview: File | null;
  time: string;
  title: string;
}

export interface IOwnRecipeCreateResponse {
  data: IRecipe;
  message: string;
}

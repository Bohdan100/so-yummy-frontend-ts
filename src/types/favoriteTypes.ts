export interface IOneIngridient {
  _id: string;
  ttl: string;
  desc: string;
  t: string;
  thb: string;
}

export interface IIngridientFromRecipe {
  id: IOneIngridient;
  measure: string;
}

export interface IRecipeById {
  _id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  preview: string;
  time: string;
  popularity: 0;
  favorites: [];
  likes: [];
  youtube: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
  owner?: string;
  ingredients: IIngridientFromRecipe[];
}

interface IResponse {
  status: string;
  code: number;
}

export interface IRecipeGetResponse extends IResponse {
  data: IRecipeById;
}

export interface IIsFavoriteResponse extends IResponse {
  data: {
    result: boolean;
  };
}

export interface IAddRecipeTоFavorites extends IResponse {
  id: string;
  favorite: boolean;
  message: string;
}

export interface IRemoveRecipeFromFavorites extends IResponse {}

export interface IRecipeFromFavoriteRecipes {
  _id: string;
  recipe: {
    _id: string;
    title: string;
    category: string;
    description: string;
    thumb: string;
    preview: string;
    time: string;
  };
  userId: string;
}

export interface IDataFromFavoriteRecipes {
  result: IRecipeFromFavoriteRecipes[];
}

export interface IFavoriteRecipesGetResponse extends IResponse {
  data: IDataFromFavoriteRecipes;
  total: number;
  page: string;
  limit: string;
}

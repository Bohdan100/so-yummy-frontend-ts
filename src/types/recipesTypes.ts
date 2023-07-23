import { IRecipe } from './ownRecipesTypes';

interface IResponse {
  status: string;
  code: number;
}

export interface ICategoriesResponse extends IResponse {
  data: string[];
}

export interface IRecipesByCategoryResponse extends IResponse {
  data: IRecipe[];
  total: number;
  page: string;
  limit: string;
}

export interface IRecipesByFourCategories {
  breakfast: Pick<
    IRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
  vegan: Pick<IRecipe, '_id' | 'title' | 'category' | 'preview' | 'thumb'>[];
  miscellaneous: Pick<
    IRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
  dessert: Pick<IRecipe, '_id' | 'title' | 'category' | 'preview' | 'thumb'>[];
}

export interface IRecipesByFourCatResponse extends IResponse {
  data: IRecipesByFourCategories;
}

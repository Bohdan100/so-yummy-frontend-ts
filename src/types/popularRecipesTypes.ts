import { IOneRecipe } from './recipesTypes';

export interface IPopularRecipesResponse {
  data: {
    result: {
      _id: string;
      recipe: Pick<
        IOneRecipe,
        '_id' | 'title' | 'description' | 'preview' | 'thumb'
      >;
      amount: number;
    }[];
  };
}

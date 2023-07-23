import { IRecipe } from './ownRecipesTypes';

export interface IPopularRecipesResponse {
  data: {
    result: {
      _id: string;
      recipe: Pick<
        IRecipe,
        '_id' | 'title' | 'description' | 'preview' | 'thumb'
      >;
      amount: number;
    }[];
  };
}

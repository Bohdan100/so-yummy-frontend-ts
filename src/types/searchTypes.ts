import { IRecipe } from './index';

export interface IRetchSearchedMealsResponse {
  totalHits: number;
  meals: IRecipe[];
}

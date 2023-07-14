export type IAllRecipes = IOneRecipe[];

export type IOneRecipe = {
  _id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  preview: string;
  time: string;
  popularity: number;
  favorites: [];
  likes: [];
  youtube: string;
  tags: [];
  createdAt: string;
  updatedAt: string;
  owner?: string;
  ingredients: [
    {
      id: string;
      measure: string;
    }
  ];
};

export interface IRecipesByFourCategories {
  breakfast: Pick<
    IOneRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
  vegan: Pick<IOneRecipe, '_id' | 'title' | 'category' | 'preview' | 'thumb'>[];
  miscellaneous: Pick<
    IOneRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
  dessert: Pick<
    IOneRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
}

export type AllRecipes = OneRecipe[];

export type OneRecipe = {
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

export interface RecipesByFourCategories {
  breakfast: Pick<
    OneRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
  vegan: Pick<OneRecipe, '_id' | 'title' | 'category' | 'preview' | 'thumb'>[];
  miscellaneous: Pick<
    OneRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
  dessert: Pick<
    OneRecipe,
    '_id' | 'title' | 'category' | 'preview' | 'thumb'
  >[];
}
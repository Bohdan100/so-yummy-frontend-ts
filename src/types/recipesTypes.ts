interface IResponse {
  status: string;
  code: number;
}

export interface ICategoriesResponse extends IResponse {
  data: string[];
}

export type IRecipe = {
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

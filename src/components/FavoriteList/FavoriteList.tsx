import  React, { FC } from 'react';
import FavoriteCard from '../FavoriteCard';
import { FavList } from './FavoriteList.styled';

import { IRecipeFromFavoriteRecipes} from 'types';

interface IProps{
  recipes: IRecipeFromFavoriteRecipes[];
  handleDelete: (id:string)=>Promise<void> ;

}

const FavoriteList:FC<IProps> = ({ recipes,
  handleDelete
}) => {
  return (
    <FavList>
      {recipes.map(recipe => (
        <FavoriteCard
          key={recipe.recipe._id}
          id={recipe.recipe._id}
          title={recipe.recipe.title}
          preview={recipe.recipe.preview}
          description={recipe.recipe.description}
          time={recipe.recipe.time}
          onDelete={() => handleDelete(recipe.recipe._id)}
        />
      ))}
    </FavList>
  );
};

export default FavoriteList;

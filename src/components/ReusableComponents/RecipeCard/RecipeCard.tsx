import { FC } from 'react';
import {
  RecipeCardImg,
  RecipeCardWrapper,
  RecipeTitle,
  TitleWrapper,
  RecipeLink,
} from './RecipeCard.styled';
import { OneRecipe } from '../../../../types/recipesTypes';

interface IRecipeCardProps {
  dish: OneRecipe;
}

const RecipeCard: FC<IRecipeCardProps> = ({ dish }) => {
  const { _id, title, preview } = dish;

  return (
    <RecipeCardWrapper>
      <RecipeLink to={`/recipes/${_id}`}>
        <RecipeCardImg src={preview} alt={title} />
        <TitleWrapper>
          <RecipeTitle>{title}</RecipeTitle>
        </TitleWrapper>
      </RecipeLink>
    </RecipeCardWrapper>
  );
};

export default RecipeCard;

import { FC } from 'react';
import { IOneRecipe } from 'types/recipesTypes';
import {
  RecipeCardImg,
  RecipeCardWrapper,
  RecipeTitle,
  TitleWrapper,
  RecipeLink,
} from './RecipeCard.styled';

interface IRecipeCardProps {
  dish: IOneRecipe;
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
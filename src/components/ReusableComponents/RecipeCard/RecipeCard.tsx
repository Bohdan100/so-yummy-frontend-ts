import { FC } from 'react';
import { IRecipe } from 'types';
import {
  RecipeCardImg,
  RecipeCardWrapper,
  RecipeTitle,
  TitleWrapper,
  RecipeLink,
} from './RecipeCard.styled';

interface IRecipeCardProps {
  dish: IRecipe;
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

import { FC } from 'react';

import IngredientsShoppingItem from 'components/IngredientsShoppingItem';
import { IngredientsListStyled } from './IngredientsShoppingList.styled';

import { IProduct } from 'types';

interface IProps {
  ingredients: IProduct[];
}

const IngredientsShoppingList: FC<IProps> = ({ ingredients }) => {
  return (
    <>
      <IngredientsListStyled>
        {ingredients.map(ingredient => (
          <IngredientsShoppingItem
            key={ingredient._id}
            image={ingredient.image}
            nameIngredient={ingredient.strIngredient}
            weight={ingredient.weight ? ingredient.weight : 'any'}
            id={ingredient._id}
          />
        ))}
      </IngredientsListStyled>
    </>
  );
};

export default IngredientsShoppingList;

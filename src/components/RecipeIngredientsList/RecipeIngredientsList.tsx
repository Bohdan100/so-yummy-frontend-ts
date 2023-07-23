import {FC} from 'react'
import { useAppSelector } from 'hooks/reduxHooks';

import { v4 as uuidv4 } from 'uuid';

import { selectProducts } from 'redux/ShoppingList/shoppingListSelectors';

import RecipeIngredientsItem from 'components/RecipeIngredientsItem';
import { IngredientsListStyled } from './RecipeIngredientsList.styled';

import {IIngridientFromRecipe} from 'types'



interface IProps { ingredients: IIngridientFromRecipe[], recipeId?: string; }

const RecipeIngredientsList:FC<IProps> = ({ ingredients, recipeId }) => {
  const list = useAppSelector(selectProducts);
  
  function getIngDescription(id:string):boolean {
    if (list.length !== 0) {
      const ingridID = list.some(ingrid => ingrid.recipeId === id);
      return ingridID;
    }
    return false;
  }

  return (
    <>
      <IngredientsListStyled>
        {ingredients.map((ingredient, index) => {
          let image;
          if (!ingredient.id.thb) {
            image = ' ';
          } else {
            image = ingredient.id.thb;
          }

          return (
            <RecipeIngredientsItem
              key={uuidv4()}
              image={image}
              nameIngredient={ingredient.id.ttl}
              descriptionIngredient={ingredient.id.desc}
              weight={ingredient.measure ? ingredient.measure : 'any'}
              list={list}
              recipeId={String(recipeId) + String(index)}
              inShoppingList={getIngDescription(String(recipeId) + String(index))}
            />
          );
        })}
      </IngredientsListStyled>
    </>
  );
};

export default RecipeIngredientsList;

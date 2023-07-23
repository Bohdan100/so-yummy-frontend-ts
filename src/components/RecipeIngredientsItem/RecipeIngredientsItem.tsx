import {FC} from'react'
import { useAppDispatch } from 'hooks/reduxHooks';

import {
  RecipeItem,
  RecipeItemWrapper,
  ImageWrapper,
  TextContainer,
  NameIngredient,
  DescriptionIngridient,
  WeighIngredient,
  CustomCheckbox,
  PickIconStyled,
  RealCheckbox,
} from './RecipeIngredientsItem.styled';

import {
  addProduct,
  deleteProduct,
} from 'redux/ShoppingList/shoppingListOperations';

import { IProduct } from 'types';
import NotPhoto from 'images/bgPages/recipePage/not-photo.png';

interface IProps {
  image: string;
  nameIngredient: string;
  descriptionIngredient: string;
  weight: string;
  recipeId: string;
  inShoppingList: boolean;
  list: IProduct[];
}

const RecipeIngredientsItem: FC<IProps> = ({
  image,
  nameIngredient,
  descriptionIngredient,
  weight,
  recipeId,
  inShoppingList,
  list,
}) => {
  const dispatch = useAppDispatch();

  const toggleToShoppingList = () => {
    if (inShoppingList) {
      const ingrid = list.find(item => {
        return item.recipeId === recipeId;
      });

      if (ingrid) {
        dispatch(deleteProduct({ id: ingrid._id }));
      }
      return;
    }
    dispatch(
      addProduct({
        strIngredient: nameIngredient,
        weight,
        image,
        recipeId,
      })
    );
    return;
  };

  return (
    <RecipeItem>
      <RecipeItemWrapper>
        <ImageWrapper>
          {image !== ' ' ? (
            <img src={image} alt={nameIngredient} />
          ) : (
            <img src={NotPhoto} alt="no ingredient" />
          )}
        </ImageWrapper>
        <TextContainer>
          <NameIngredient>{nameIngredient}</NameIngredient>
          {descriptionIngredient && (
            <DescriptionIngridient>
              {descriptionIngredient}
            </DescriptionIngridient>
          )}
        </TextContainer>

        <WeighIngredient>{weight}</WeighIngredient>
        <RealCheckbox
          type="checkbox"
          onChange={toggleToShoppingList}
          checked={inShoppingList}
        />
        <CustomCheckbox>
          <PickIconStyled />
        </CustomCheckbox>
      </RecipeItemWrapper>
    </RecipeItem>
  );
};

export default RecipeIngredientsItem;

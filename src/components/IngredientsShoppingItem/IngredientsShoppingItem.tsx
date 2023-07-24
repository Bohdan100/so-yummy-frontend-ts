import {FC} from 'react'
import { useAppDispatch } from 'hooks/reduxHooks';

import {
  IngredientItem,
  ImageWrapper,
  TextContainer,
  NameIngredient,
  WeighIngredient,
  DelIconStyled,
  DeleteButton,
} from './IngredientsShoppingItem.styled';

import { deleteProduct } from 'redux/ShoppingList/shoppingListOperations';
import NotPhoto from '../../images/bgPages/recipePage/not-photo.png';

interface IProps{
  image: string;
  id: string;
  nameIngredient: string;
  weight: string;
}

const IngredientsShoppingItem:FC<IProps> = ({ image, id, nameIngredient, weight }) => {
  const dispatch = useAppDispatch();

  return (
    <IngredientItem>
      <ImageWrapper>
        {image !== ' ' ? (
          <img src={image} alt={nameIngredient} />
        ) : (
          <img src={NotPhoto} alt="no ingredient" />
        )}
      </ImageWrapper>
      <TextContainer>
        <NameIngredient>{nameIngredient}</NameIngredient>
      </TextContainer>
      <WeighIngredient>{weight}</WeighIngredient>
      <DeleteButton type="button" onClick={() => dispatch(deleteProduct({id}))}>
        <DelIconStyled />
      </DeleteButton>
    </IngredientItem>
  );
};

export default IngredientsShoppingItem;

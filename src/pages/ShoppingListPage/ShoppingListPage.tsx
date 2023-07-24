import { FC } from 'react';
import { IProduct } from 'types';
import { useShoppingList } from 'hooks/useShoppingList';
import { useTranslation } from 'react-i18next';

import Loader from 'components/Loader';
import MainContainer from 'components/MainContainer';
import IngredientsShoppingList from 'components/IngredientsShoppingList';
import ReusableTitle from 'components/ReusableComponents/ReusableTitle';
import NotFoundWrapp from 'components/ReusableComponents/NotFoundWrapp';

import { HeaderTable, StyledLoaderWrapper } from './ShoppingListPage.styled';

const isLoading = false;

const ShoppingListPage: FC = () => {
  const { t } = useTranslation();

  const shoppingList = useShoppingList().products;

  const reverse = (arr: IProduct[]): IProduct[] =>
    arr.map((_, index) => arr[arr.length - 1 - index]);

  const reversedShoppingList = reverse(shoppingList);

  return (
    <MainContainer>
      <ReusableTitle>{t('shoppingListPage.title')}</ReusableTitle>
      <HeaderTable>
        <p>{t('shoppingListPage.products')}</p>
        <p>
          {t('shoppingListPage.number')}
          <span>{t('shoppingListPage.remove')}</span>
        </p>
      </HeaderTable>
      {isLoading ? (
        <StyledLoaderWrapper>
          <Loader />
        </StyledLoaderWrapper>
      ) : (
        <>
          {shoppingList.length === 0 ? (
            <NotFoundWrapp>{t('shoppingListPage.notFoundText')}</NotFoundWrapp>
          ) : (
            <IngredientsShoppingList ingredients={reversedShoppingList} />
          )}
        </>
      )}
    </MainContainer>
  );
};

export default ShoppingListPage;

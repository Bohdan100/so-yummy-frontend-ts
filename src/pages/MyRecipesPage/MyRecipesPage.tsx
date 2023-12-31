import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';

import MainContainer from 'components/MainContainer';
import MyRecipeList from 'components/MyRecipe/MyRecipeList/';
import PaginationComp from 'components/Pagination';
import { WrapText } from 'components/WrapText/WrapText';
import Loader from 'components/Loader';
import {
  getOwnRecipesList,
  getTotalOwnRecipes,
  selectIsLoading,
} from '../../redux/OwnRecipes/ownRecipesSelectors';
import { getOwnRecipes } from 'redux/OwnRecipes/ownRecipesOperations';
import ReusableTitle from '../../components/ReusableComponents/ReusableTitle';

const MyRecipesPage = () => {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(getOwnRecipesList);
  const total = useAppSelector(getTotalOwnRecipes);
  const isFetching = useAppSelector(selectIsLoading);
  const limit = 4;
  const [pageNumber, setPageNumber] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getOwnRecipes({ page: pageNumber, limit: limit }));
  }, [dispatch, pageNumber]);

  // TODO - хз, что тут в event
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  useEffect(() => {
    history(`?page=${pageNumber}`);
  }, [history, pageNumber]);

  return (
    <div>
      <MainContainer>
        <ReusableTitle>{t('myRecipesPage.title')}</ReusableTitle>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            {recipes && recipes.length > 0 ? (
              <MyRecipeList data={recipes} />
            ) : (
              <WrapText />
            )}
            {recipes && recipes.length > 0 && (
              <PaginationComp
                count={Math.ceil(total / limit)}
                page={pageNumber}
                handleChange={handleChange}
              />
            )}
          </>
        )}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </MainContainer>
    </div>
  );
};

export default MyRecipesPage;

import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { IRecipe } from 'types';
import MainContainer from 'components/MainContainer/MainContainer';
import ReusableTitle from 'components/ReusableComponents/ReusableTitle';
import RecipeCard from 'components/ReusableComponents/RecipeCard';
import SearchBar from 'components/SearchPage/SearchBar';
import NotFoundWrapp from 'components/ReusableComponents/NotFoundWrapp';
import Loader from 'components/Loader';
import { RecipesList } from 'components/CategoriesByName/CategoriesByName.styled';

import { scrollToTop } from 'helpers';
import PaginationComp from 'components/Pagination/Pagination';
import { fetchSearchedMeals } from 'services/searchMeals-API';
import { useDesktopCheck } from 'hooks/desktopCheck';

const SearchPage: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState<number>(1);
  const { isTablet, isDesktop } = useDesktopCheck();
  const { t } = useTranslation();

  const query: string = searchParams.get('query') ?? '';
  const type: string = searchParams.get('type') ?? 'Title';

  const perPageItems = (): string => {
    let perPage;
    if (isDesktop) {
      perPage = '12';
    } else if (isTablet) {
      perPage = '6';
    } else {
      perPage = '6';
    }
    return perPage;
  };

  const onSubmit = (query: string, type: string) => {
    setPage(1);
    setError(null);
    setSearchParams({
      type,
      query,
      page: page.toString(),
      perPage: perPageItems(),
    });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams({
      type,
      query,
      page: value.toString(),
      perPage: perPageItems(),
    });

    scrollToTop();
  };
  useEffect(() => {
    if (query === '' || type === '') return;

    async function SearchRecipes() {
      try {
        setIsLoading(true);
        const data = await fetchSearchedMeals(searchParams);

        if (data.meals.length === 0) {
          toast.error(t('searchPage.errorFirst'), {
            position: 'top-right',
          });
        }
        setRecipes(data.meals);
        setTotalHits(data.totalHits);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(t('searchPage.errorSecond'), {
            position: 'top-right',
          });
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    SearchRecipes();
  }, [type, query, searchParams, t]);

  const style = { marginBottom: 40 };

  return (
    <MainContainer>
      <ReusableTitle>{t('searchPage.title')}</ReusableTitle>
      <SearchBar onSubmit={onSubmit} startType={type} startQuery={query} />
      {error && (
        <NotFoundWrapp>
          {t('searchPage.notFoundText')} {error}
        </NotFoundWrapp>
      )}
      {isLoading && <Loader />}
      {recipes.length > 0 && !error && !isLoading && (
        <RecipesList style={style}>
          {recipes.map(recipe => {
            return <RecipeCard dish={recipe} key={recipe._id} />;
          })}
        </RecipesList>
      )}
      {recipes && totalHits - recipes.length > 0 && (
        <PaginationComp
          count={Math.ceil(totalHits / Number(perPageItems()))}
          page={page}
          handleChange={handleChange}
        />
      )}
      {!isLoading && !error && recipes.length === 0 && (
        <NotFoundWrapp>{t('searchPage.notFoundTextSecond')}</NotFoundWrapp>
      )}
    </MainContainer>
  );
};

export default SearchPage;

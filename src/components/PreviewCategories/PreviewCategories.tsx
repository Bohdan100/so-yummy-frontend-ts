import { FC, useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as API from 'services/categories-API';
import Loader from 'components/Loader/Loader';
import NotFoundWrapp from 'components/ReusableComponents/NotFoundWrapp';
import RecipeCard from 'components/ReusableComponents/RecipeCard/RecipeCard';
import { OneRecipe } from '../../../types/recipesTypes';
import {
  CategoryList,
  SeeAllBtn,
  CardList,
  Title,
  OtherBtn,
} from './PreviewCategories.styled';
import { RecipesByFourCategories } from '../../../types/recipesTypes';

const PreviewCategories: FC = () => {
  const isTabletDevice = useMedia('(min-width: 768px)');
  const isDesctopDevice = useMedia('(min-width: 1440px)');
  const [recipesByMainCategories, setRecipesByMainCategories] =
    useState<RecipesByFourCategories>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let count: number;
    if (isDesctopDevice) {
      count = 4;
    } else if (isTabletDevice) {
      count = 2;
    } else {
      count = 1;
    }
    async function getRecipesByFourCategory() {
      try {
        setIsLoading(true);
        const {
          data: { recipes },
        } = await API.fetchRecipesByFourCategory(count);
        setRecipesByMainCategories(recipes);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(t('PreviewCategories.error'));
        }
      } finally {
        setIsLoading(false);
      }
    }
    getRecipesByFourCategory();
  }, [isDesctopDevice, isTabletDevice, t]);

  return (
    <>
      {error && (
        <NotFoundWrapp>
          {t('PreviewCategories.errorText')} {error}
        </NotFoundWrapp>
      )}
      {isLoading && <Loader />}
      <CategoryList>
        {recipesByMainCategories &&
          Object.entries(recipesByMainCategories).map(
            ([category, recipes], idx) => {
              return (
                <li key={`${category}-${idx}`}>
                  <Title>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Title>
                  <CardList>
                    {recipes.map((recipe: OneRecipe) => (
                      <RecipeCard dish={recipe} key={recipe._id} />
                    ))}
                  </CardList>
                  <SeeAllBtn to={`/categories/${category}`}>
                    {t('PreviewCategories.seeAllBtnText')}
                  </SeeAllBtn>
                </li>
              );
            }
          )}
      </CategoryList>
      <OtherBtn to={'/categories'}>
        {t('PreviewCategories.otherBtnText')}
      </OtherBtn>
    </>
  );
};

export default PreviewCategories;

import { FC, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MainContainer from 'components/MainContainer/MainContainer';
import RecipePageHero from 'components/RecipePageHero';
import RecipeIngredientsList from 'components/RecipeIngredientsList';
import RecipePreparation from 'components/RecipePreparation';
import Loader from 'components/Loader/Loader';
import { scrollToTop } from 'helpers/scrollToTop';

import { HeaderTable, RecipePageStyled } from './RecipePage.styled';

import * as API from 'services/favorite-API';

import { IRecipeById } from 'types';

const RecipePage: FC = () => {
  const [recipeObj, setRecipeObj] = useState<IRecipeById | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { recipeId } = useParams<{ recipeId?: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    async function getOneRecipe(recipeId: string) {
      try {
        setIsLoading(true);
        const { data } = await API.fetchOneRacipes(recipeId);
        setRecipeObj(data);
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setRecipeObj(null);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getOneRecipe(String(recipeId));
  }, [recipeId]);

  return (
    <RecipePageStyled>
      {error && (
        <p>
          {t('recipePage.errorText')} {error}
        </p>
      )}
      {isLoading && <Loader />}

      {recipeObj && (
        <>
          <RecipePageHero recipeObj={recipeObj} recipeId={recipeId} />

          <MainContainer>
            <HeaderTable>
              <p>{t('recipePage.ingridients')}</p>
              <p>
                {t('recipePage.number')}
                <span>{t('recipePage.addToList')}</span>
              </p>
            </HeaderTable>

            <RecipeIngredientsList
              ingredients={recipeObj.ingredients}
              recipeId={recipeId}
            /> 
            <RecipePreparation
              image={recipeObj.thumb}
              instructions={recipeObj.instructions}
            />
          </MainContainer>
        </>
      )}
    </RecipePageStyled>
  );
};

export default RecipePage;

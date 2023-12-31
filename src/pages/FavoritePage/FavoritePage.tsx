import React, { FC,useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  fetchFavoriteRacipes,
  removeRecipeFromFavorites,
} from 'services/favorite-API';
import Loader from 'components/Loader/Loader';
import ReusableTitle from 'components/ReusableComponents/ReusableTitle';
import Container from 'components/MainContainer';
import FavoriteList from 'components/FavoriteList';
import PaginationComp from 'components/Pagination/Pagination';
import { NotFavorites } from 'components/FavoriteList/FavoriteList.styled';
import { Wrapper, ImgWrapper } from 'components/WrapText/WrapText.styled';
import Mob1 from 'images/bgPages/searchPage/search_page_mob@1x.png';
import Mob2 from 'images/bgPages/searchPage/search_page_mob@2x.png';
import Tablet1 from 'images/bgPages/searchPage/search_page_tablet@1x.png';
import Tablet2 from 'images/bgPages/searchPage/search_page_tablet@2x.png';
import Desktop1 from 'images/bgPages/searchPage/search_page_desktop@1x.png';
import Desktop2 from 'images/bgPages/searchPage/search_page_desktop@2x.png';

import {IDataFromFavoriteRecipes } from "types";

const FavoritePage: FC = () => {
  const [recipes, setRecipes] = useState<IDataFromFavoriteRecipes|null> (null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const history = useNavigate();
  const limit = 4;
  const { t } = useTranslation();

  useEffect(() => {
    async function getFavoriteRacipes() {
      try {
        setIsLoading(true);
        const response = await fetchFavoriteRacipes(pageNumber, limit);
      
        

        setRecipes(response.data);
        setTotal(response.total);
      } catch (error) {
        if(error instanceof Error) {    setError( error.message );}
    
        toast.error(t('favoritePage.error'));
      } finally {
        setIsLoading(false);
      }
    }

    getFavoriteRacipes();
  }, [pageNumber, t]);

  useEffect(() => {
    history(`?page=${pageNumber}`);
  }, [history, pageNumber]);

  const handleChange = (event: React.ChangeEvent<unknown>, value:number) => {
    setPageNumber(value);
  };

  const handleRemoveRecipe = async (id:string) => {
    try {
      setIsLoading(true);
      await removeRecipeFromFavorites(id);

      const response = await fetchFavoriteRacipes(pageNumber, limit);

      setRecipes(response.data);
      setTotal(response.total);
    } catch (error) {
      if(error instanceof Error){  setError( error.message);}
    
      toast.error(t('favoritePage.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Container>
        <ReusableTitle>{t('favoritePage.title')}</ReusableTitle>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {recipes && recipes.result && recipes.result.length > 0 ? (
              <FavoriteList
                recipes={recipes.result}
                handleDelete={handleRemoveRecipe}
              />
            ) : (
              <Wrapper>
                <ImgWrapper>
                  <picture>
                    <source
                      media="(min-width: 1440px)"
                      srcSet={`${Desktop1}, ${Desktop2} 2x`}
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={`${Tablet1}, ${Tablet2} 2x`}
                    />
                    <img
                      src={Mob1}
                      srcSet={`${Mob1}, ${Mob2} 2x`}
                      alt="no recipes"
                    />
                  </picture>
                </ImgWrapper>
                <NotFavorites>{t('favoritePage.notFavorites')}</NotFavorites>
              </Wrapper>
            )}
            {recipes && recipes.result && recipes.result.length > 0 && (
              <PaginationComp
                count={Math.ceil(total / limit)}
                page={pageNumber}
                handleChange={handleChange}
              />
            )}
          </>
        )}
        {error && <p>Whoops, something went wrong: {error}</p>}
      </Container>
    </>
  );
};

export default FavoritePage;

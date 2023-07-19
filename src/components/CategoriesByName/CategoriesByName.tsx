import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as API from 'services/categories-API';
import { IRecipe } from 'types';
import Loader from 'components/Loader';
import RecipeCard from 'components/ReusableComponents/RecipeCard/RecipeCard';
import NotFoundWrapp from 'components/ReusableComponents/NotFoundWrapp';
import { RecipesList } from './CategoriesByName.styled';

const CategoriesByName: FC = () => {
  const { categoryName: category } = useParams<string>();
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getRecipesByCategory() {
      try {
        setIsLoading(true);
        const { data } = await API.fetchRecipesByCategory(category);
        setRecipes(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(`Something went wrong. Plese try again...`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getRecipesByCategory();
  }, [category]);

  return (
    <>
      {error && <NotFoundWrapp>Whoops, something went wrong...</NotFoundWrapp>}
      {isLoading && <Loader />}
      {recipes.length > 0 && !error && !isLoading && (
        <RecipesList>
          {recipes.map(recipe => {
            return <RecipeCard dish={recipe} key={recipe._id} />;
          })}
        </RecipesList>
      )}
      {!isLoading && !error && recipes.length === 0 && (
        <NotFoundWrapp>Try looking for something else...</NotFoundWrapp>
      )}
    </>
  );
};

export default CategoriesByName;

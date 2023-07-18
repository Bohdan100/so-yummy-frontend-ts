import { useNavigate } from 'react-router';
import { useAppDispatch } from 'hooks/reduxHooks';
// TODO
// import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { deleteOwnRecipe } from 'redux/OwnRecipes/ownRecipesOperations';

import {
  Item,
  MainBox,
  WrapperBox,
  TitleRecipe,
  DeleteBtn,
  AboutRecipe,
  Time,
  BtnSee,
  WrapperUp,
  BtnBox,
  Container,
  Image,
  IconBtn,
} from './MyRecipeItem.styled';

interface IMyRecipeItemProps {
  description: string;
  preview: string;
  time: string;
  title: string;
  id: string;
}

const MyRecipeItem: React.FC<IMyRecipeItemProps> = ({
  description,
  preview,
  time,
  title,
  id: recipeId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenOwnRecipe = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <Item key={recipeId}>
      <MainBox>
        <Image src={preview} alt={title} />
        <Container>
          <WrapperBox>
            <TitleRecipe>{title}</TitleRecipe>
            <BtnBox>
              <DeleteBtn
                type="button"
                onClick={() =>
                  dispatch(
                    deleteOwnRecipe({ recipeId })
                    // TODO
                    // toast.success(t('myRecipeItem.success'))
                  )
                }
              >
                <IconBtn />
              </DeleteBtn>
            </BtnBox>
            <AboutRecipe>{description}</AboutRecipe>
          </WrapperBox>

          <WrapperUp>
            <Time>
              {time} {t('myRecipeItem.time')}
            </Time>
            <BtnSee onClick={() => handleOpenOwnRecipe(recipeId)}>
              {t('myRecipeItem.btn')}
            </BtnSee>
          </WrapperUp>
        </Container>
      </MainBox>
    </Item>
  );
};

export default MyRecipeItem;

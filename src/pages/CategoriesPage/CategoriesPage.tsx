import { FC, useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MainContainer from 'components/MainContainer';
import CategoriesList from 'components/CategoriesByName/CategoriesList';
import ReusableTitle from 'components/ReusableComponents/ReusableTitle';
import Loader from 'components/Loader';
import { scrollToTop } from 'helpers/scrollToTop';

const CategoriesPage: FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <MainContainer>
      <ReusableTitle>{t('categoriesPage.title')}</ReusableTitle>
      <CategoriesList />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </MainContainer>
  );
};

export default CategoriesPage;

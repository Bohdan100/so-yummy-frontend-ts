import { FC } from 'react';
import MainHero from 'components/Main/MainHero';
import MainContainer from 'components/MainContainer';
import PreviewCategories from 'components/PreviewCategories/PreviewCategories';

const MainPage: FC = () => {
  return (
    <MainContainer>
      <MainHero />
      <PreviewCategories />
    </MainContainer>
  );
};

export default MainPage;

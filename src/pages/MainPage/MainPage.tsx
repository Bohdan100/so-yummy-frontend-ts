import { FC } from 'react';
import MainHero from 'components/Main/MainHero/MainHero';
import MainContainer from 'components/MainContainer/MainContainer';
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

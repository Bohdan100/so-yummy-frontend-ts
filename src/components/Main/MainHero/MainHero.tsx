import { FC } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDesktopCheck } from 'hooks/desktopCheck';
import SearchForm from 'components/ReusableComponents/SearchForm';
import СhooseYourBreakfast from 'components/Main/СhooseYourBreakfast';
import HeroBg from '../HeroBG';
import { MainContainerTwo } from 'components/Header/Header.styled';
import {
  MainPageH1,
  MainPageText,
  MainPageDiv,
  SpanGr,
} from './MainHero.styled';

const MainHero: FC = () => {
  const { isTablet, isDesktop } = useDesktopCheck();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const perPageItems = (): number => {
    let perPage;
    if (isDesktop) {
      perPage = 12;
    } else if (isTablet) {
      perPage = 6;
    } else {
      perPage = 6;
    }
    return perPage;
  };

  const handleSubmit = (query: string, type: string) => {
    if (query === '') {
      toast.error(t('mainHero.error'), {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    navigate(
      `/search?query=${query}&type=${type}&page=1&perPage=${perPageItems()}`
    );
  };

  return (
    <>
      <MainContainerTwo>
        <MainPageDiv>
          <MainPageH1>
            <SpanGr>So</SpanGr>Yummy
          </MainPageH1>
          <MainPageText>{t('mainHero.description')}</MainPageText>
          <СhooseYourBreakfast />
          <SearchForm onSubmit={handleSubmit} />
        </MainPageDiv>
        <HeroBg />
      </MainContainerTwo>
    </>
  );
};

export default MainHero;

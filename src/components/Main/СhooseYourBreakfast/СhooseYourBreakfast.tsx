import { FC } from 'react';
import { useMedia } from 'react-use';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'helpers/scrollToTop';
import Arrow from '../HeroBG/Arrow';
import Plate from '../HeroBG/Plate';
import {
  ChooseBlock,
  ChooseLink,
  ChooseSpan,
  ChooseText,
  RightArrow,
} from './СhooseYourBreakfast.styles';

const СhooseYourBreakfast: FC = () => {
  const isTabDevice = useMedia('(min-width: 768px)');
  const isDescDevice = useMedia('(min-width: 1440px)');
  const { t } = useTranslation();

  return (
    <>
      <ChooseBlock>
        <ChooseText>
          <ChooseSpan>{t('mainHero.chooseSpan')} &nbsp;</ChooseSpan>
          {t('mainHero.chooseText')}
        </ChooseText>
        <ChooseLink to="/categories/breakfast" onClick={scrollToTop}>
          {t('mainHero.see')}
          <RightArrow
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 6H13.5M13.5 6L9 1.5M13.5 6L9 10.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </RightArrow>
        </ChooseLink>
      </ChooseBlock>
      {isTabDevice && <Arrow />}
      {isDescDevice && <Arrow />}
      <Plate />
    </>
  );
};

export default СhooseYourBreakfast;

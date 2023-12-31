import {FC} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import {
  PreparationWrapper,
  InstrWrapper,
  InstrTitle,
  InstrList,
  InstrText,
  InstrWrapperImg,
} from './RecipePreparation.styled';

interface IProps { image: string; instructions: string; }


const RecipePreparation:FC<IProps> = ({ image, instructions }) => {
  const { t } = useTranslation();
  const items = instructions
    .split('\r\n')
    .filter(elem => {
      if (!elem) return false;
      if (!isNaN(Number(elem))) return false;
      if (elem.toLowerCase().includes('step')) return false;
      return true;
    })
    .map((item, index) => {
      let slicedItem = item;
      for (let i = 0; i < 2; i++) {
        if (!isNaN(Number(slicedItem[i])) || slicedItem[i] === '.') {
          slicedItem = slicedItem.slice(i + 1);
        }
      }
      return (
        <InstrText key={uuidv4()}>
          <span>{index + 1}</span>
          <p>{slicedItem}</p>
        </InstrText>
      );
    });

  return (
    <PreparationWrapper>
      <InstrWrapper>
        <InstrTitle>{t('recipePreparation.title')}</InstrTitle>
        <InstrList>{items}</InstrList>
      </InstrWrapper>

      <InstrWrapperImg>
        <img src={image} alt={''} />
      </InstrWrapperImg>
    </PreparationWrapper>
  );
};

export default RecipePreparation;

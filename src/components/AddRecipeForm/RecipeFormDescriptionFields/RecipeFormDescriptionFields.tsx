import { Dispatch, SetStateAction, useRef, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { allTime } from 'data/dataForAddRecipeForm';
import { ReactComponent as Arrow } from '../../../images/icons/chevron-down.svg';
import ImgWithPreview from '../ImgWithPreview';

import {
  InfoWrapper,
  ImgWrapperForError,
  ErrMsgForImg,
  Descriptions,
  WrapperErrMessForTitle,
  Input,
  ErrMessage,
  WrapperErrMessForDescrip,
  WrapperCategory,
  WrapperCookingTime,
  SelectStyled,
  WrapperOption,
  ArrowWrapper,
  SelectContent,
  SelectItem,
} from './RecipeFormDescriptionFields.styled';

import { useAppSelector } from 'hooks/reduxHooks';
import { selectTheme } from 'redux/Theme/themeSelectors';

import { IFormErrors } from 'types';

interface IRecipeFormDescriptionFieldsProps {
  allCategory: string[];
  image: {
    preview: File | null;
    setPreview: Dispatch<SetStateAction<File | null>>;
  };
  name: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
  };
  descriptionData: {
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
  };
  categoryData: {
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
  };
  cokingTime: {
    time: string;
    setTime: Dispatch<SetStateAction<string>>;
  };
  formErrors: IFormErrors;
}

const RecipeFormDescriptionFields: FC<IRecipeFormDescriptionFieldsProps> = ({
  allCategory,
  image: { preview, setPreview },
  name: { title, setTitle },
  descriptionData: { description, setDescription },
  categoryData: { category, setCategory },
  cokingTime: { time, setTime },
  formErrors,
}) => {
  const theme = useAppSelector(selectTheme);
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);
  const [isActiveTime, setIsActiveTime] = useState<boolean>(false);
  const inputEl = useRef(null);
  const { t } = useTranslation();

  return (
    <InfoWrapper>
      <ImgWrapperForError>
        <ImgWithPreview imgAdd={preview} setImgAdd={setPreview} />
        {Object.keys(formErrors).length !== 0 && formErrors?.preview && (
          <ErrMsgForImg>{formErrors.preview}</ErrMsgForImg>
        )}
      </ImgWrapperForError>

      <Descriptions>
        <WrapperErrMessForTitle>
          <Input
            type="text"
            name="title"
            autoComplete="off"
            value={title}
            placeholder={t('recipeFormDescriptionFields.placeholderFirst')}
            onChange={e => setTitle(e.target.value)}
          />
          {formErrors?.title && <ErrMessage>{formErrors?.title}</ErrMessage>}
        </WrapperErrMessForTitle>

        <WrapperErrMessForDescrip>
          <Input
            type="text"
            name="description"
            autoComplete="off"
            placeholder={t('recipeFormDescriptionFields.placeholderSecond')}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          {formErrors?.description && (
            <ErrMessage>{formErrors?.description}</ErrMessage>
          )}
        </WrapperErrMessForDescrip>

        <WrapperCategory>
          <Input
            type="text"
            readOnly={true}
            placeholder={t('recipeFormDescriptionFields.placeholderThird')}
            style={{ cursor: 'pointer' }}
          />
          {formErrors?.category && (
            <ErrMessage>{formErrors?.category}</ErrMessage>
          )}

          <SelectStyled
            ref={inputEl}
            onClick={() => setIsActiveCategory(!isActiveCategory)}
          >
            <WrapperOption>{category}</WrapperOption>
            <ArrowWrapper>
              <Arrow width="20px" height="20px" />
            </ArrowWrapper>
          </SelectStyled>
          {isActiveCategory && (
            <SelectContent>
              {allCategory.map((value, index) => (
                <SelectItem
                  key={value + '' + index}
                  onClick={e => {
                    setCategory(value);
                    setIsActiveCategory(false);
                  }}
                  color={
                    value === category && theme === 'light'
                      ? '#8BAA36'
                      : '#000000'
                  }
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </WrapperCategory>

        <WrapperCookingTime>
          <Input
            type="text"
            placeholder={t('recipeFormDescriptionFields.placeholderForth')}
            style={{ cursor: 'pointer' }}
          />
          {formErrors?.time && <ErrMessage>{formErrors?.time}</ErrMessage>}

          <SelectStyled
            ref={inputEl}
            onClick={e => setIsActiveTime(!isActiveTime)}
          >
            <WrapperOption>{time}</WrapperOption>
            <ArrowWrapper>
              <Arrow width="20px" height="20px" />
            </ArrowWrapper>
          </SelectStyled>
          {isActiveTime && (
            <SelectContent style={{ width: '90px' }}>
              {allTime.map((value, index) => (
                <SelectItem
                  key={value + '' + index}
                  onClick={() => {
                    setTime(value);
                    setIsActiveTime(false);
                  }}
                  color={
                    value === time && theme === 'light' ? '#8BAA36' : '#000000'
                  }
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </WrapperCookingTime>
      </Descriptions>
    </InfoWrapper>
  );
};

export default RecipeFormDescriptionFields;

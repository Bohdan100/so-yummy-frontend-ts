import { Dispatch, SetStateAction, FC } from 'react';

import { useTranslation } from 'react-i18next';
import {
  WrapperTextarea,
  TitlePreparation,
  Textarea,
  ErrMessage,
} from './RecipeFormPreparationFields.styled';

import { IFormErrors } from 'types';

interface IRecipeFormPreparationFieldsProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  formErrors: IFormErrors;
}

const RecipeFormPreparationFields: FC<IRecipeFormPreparationFieldsProps> = ({
  value,
  onChange,
  formErrors,
}) => {
  const { t } = useTranslation();

  return (
    <WrapperTextarea>
      <TitlePreparation>
        {t('recipeFormPreparationFields.title')}
      </TitlePreparation>
      <Textarea
        name="recipe"
        placeholder={t('recipeFormPreparationFields.placeholder')}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {formErrors?.instructions && (
        <ErrMessage>{formErrors?.instructions}</ErrMessage>
      )}
    </WrapperTextarea>
  );
};

export default RecipeFormPreparationFields;

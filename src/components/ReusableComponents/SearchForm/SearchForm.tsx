import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchBlock, SearchIn, SearchInput } from './SearchForm.styled';
import ButnSkew from 'components/ButtonSkew';

interface ISearchFormProps {
  onSubmit: (query: string, type: string) => void;
  type?: string;
  startQuery?: string;
}

const SearchForm: FC<ISearchFormProps> = ({
  onSubmit,
  type = 'Title',
  startQuery,
}) => {
  const [searchValue, setInputValue] = useState<string>(startQuery ?? '');
  const { t } = useTranslation();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(searchValue, type);
  }

  return (
    <SearchBlock>
      <SearchIn onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={searchValue}
          placeholder={t('searchForm.btnPlaceholder')}
          onChange={handleChange}
        />
        <ButnSkew type="submit" text={t('searchForm.btnText')} />
      </SearchIn>
    </SearchBlock>
  );
};

export default SearchForm;

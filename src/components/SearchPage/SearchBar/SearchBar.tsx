import { FC, useState } from 'react';
import SearchForm from '../../ReusableComponents/SearchForm';
import SearchTypeSelector from '../SearchTypeSelector';
import { SearchBarCont } from './SearchBar.styled';

interface ISearchBarProps {
  onSubmit: (query: string, type: string) => void;
  startType: string;
  startQuery: string;
}

const SearchBar: FC<ISearchBarProps> = ({
  onSubmit,
  startType,
  startQuery,
}) => {
  const [type, setType] = useState('');

  const typeSubmit = (inputType: any) => {
    const { value } = inputType;
    setType(value);
  };

  return (
    <SearchBarCont>
      <SearchForm type={type} onSubmit={onSubmit} startQuery={startQuery} />
      <SearchTypeSelector startType={startType} typeSubmit={typeSubmit} />
    </SearchBarCont>
  );
};
export default SearchBar;

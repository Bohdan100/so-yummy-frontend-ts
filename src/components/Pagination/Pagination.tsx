import { Pagination } from '@mui/material';
import { PaginationWrapper } from './Pagination.styled';

interface IPaginationCompProps {
  count: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
const PaginationComp: React.FC<IPaginationCompProps> = ({
  count,
  page,
  handleChange,
}) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <PaginationWrapper>
      <Pagination
        siblingCount={0}
        count={count}
        page={page}
        onChange={handleChange}
      />
    </PaginationWrapper>
  );
};

export default PaginationComp;

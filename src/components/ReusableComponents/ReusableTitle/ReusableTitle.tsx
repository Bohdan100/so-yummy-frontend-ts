import { FC } from 'react';
import BackgroundDots from '../BackgroundDots';
import { Title } from './ReusableTitle.styled';

interface IReusableTitleProps {
  children: string;
}

const ReusableTitle: FC<IReusableTitleProps> = ({ children }) => {
  return (
    <>
      <BackgroundDots />
      <Title>{children}</Title>
    </>
  );
};

export default ReusableTitle;

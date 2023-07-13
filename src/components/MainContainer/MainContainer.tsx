import { FC, ReactNode } from 'react';
import { Container } from './MainContainer.styled';

const MainContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default MainContainer;

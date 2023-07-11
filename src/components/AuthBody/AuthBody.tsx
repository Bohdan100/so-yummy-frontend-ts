import { FC, ReactNode } from 'react';
import { Wrapper, Background, BackgroundImage } from './AuthBody.styled';

interface IAuthBodyProps {
  children: ReactNode;
}

const AuthBody: FC<IAuthBodyProps> = ({ children }) => {
  return (
    <Wrapper>
      <Background />
      {children}
      <BackgroundImage />
    </Wrapper>
  );
};

export default AuthBody;

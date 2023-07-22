import Logo from '../../Logo/Logo';
import { LogoWrapper, Title } from './LogoFooter.styled';

import { FC } from 'react';
const LogoFooter: FC = () => {
  return (
    <LogoWrapper>
      <Logo inv={'true'} footer={'true'} />
      <Title>So Yummy</Title>
    </LogoWrapper>
  );
};

export default LogoFooter;

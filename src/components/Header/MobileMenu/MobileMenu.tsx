import { FC } from 'react';
import Logo from 'components/Logo';
import Navigation from '../Navigation';
import ThemeToggler from '../ThemeToggler';

import {
  MobileContainer,
  LogoWrapper,
  CloseBtn,
  ThemeTogglerWrapper,
  CrossIconStyled,
} from './MobileMenu.styled';

interface IMobileMenuProps {
  isShown: boolean;
  closeMobMenu: () => void;
}

const MobileMenu: FC<IMobileMenuProps> = ({ isShown, closeMobMenu }) => {
  return (
    <MobileContainer isShown={isShown}>
      <LogoWrapper>
        <Logo closeMobMenu={closeMobMenu} />
      </LogoWrapper>

      <CloseBtn type="button" onClick={closeMobMenu}>
        <CrossIconStyled />
      </CloseBtn>

      <Navigation closeMobMenu={closeMobMenu} />

      <ThemeTogglerWrapper>
        <ThemeToggler />
      </ThemeTogglerWrapper>
    </MobileContainer>
  );
};

export default MobileMenu;

import { FC } from 'react';
import { useMedia } from 'react-use';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SvgLogoStyled, SvgLogoInvStyled } from './Logo.styled';

interface ILogoProps {
  inv?: string;
  footer?: string;
  closeMobMenu?: () => void;
}

const Logo: FC<ILogoProps> = ({ inv, footer, closeMobMenu }) => {
  const { pathname } = useLocation();
  const isMobile = useMedia('(max-width: 767px)');

  const isInv = (inv && isMobile && pathname === '/main') || (footer && inv);

  if (isInv) {
    return (
      <Link to="/main">
        <SvgLogoInvStyled inv={inv} footer={footer} />
      </Link>
    );
  }
  return (
    <Link to="/main" onClick={closeMobMenu}>
      <SvgLogoStyled />
    </Link>
  );
};

export default Logo;

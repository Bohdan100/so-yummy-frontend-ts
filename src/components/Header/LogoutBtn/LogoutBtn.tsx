import { FC } from 'react';
import { LogOutBtnStyled, ArrowIconStyled } from './LogoutBtn.styled';
import { useTranslation } from 'react-i18next';

interface ILogoutBtnProps {
  onLogoutClick: () => void;
}

const LogoutBtn: FC<ILogoutBtnProps> = ({ onLogoutClick }) => {
  const { t } = useTranslation();
  return (
    <LogOutBtnStyled onClick={onLogoutClick}>
      <span>{t('logout.logoutBtn')}</span>
      <ArrowIconStyled />
    </LogOutBtnStyled>
  );
};

export default LogoutBtn;

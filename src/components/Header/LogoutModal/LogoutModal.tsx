import { FC } from 'react';
import { useAppDispatch } from 'hooks';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { logout } from 'redux/Auth/authOperations';
import {
  ModalWrapper,
  CrossBtb,
  CrossIconStyled,
  ConfirmTitle,
  BtnWrapper,
  LogoutBtn,
  CancelBtn,
} from './LogoutModal.styled';

interface ILogoutModal {
  isShown: boolean;
  closeLogoutModal: () => void;
}

const LogoutModal: FC<ILogoutModal> = ({ isShown, closeLogoutModal }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleLogoutBtn = () => {
    dispatch(logout())
      .unwrap()
      .then(() => toast.success(t('logout.success')))
      .catch(() => toast.error(t('logout.error')));
    closeLogoutModal();
  };
  return (
    <ModalWrapper isShown={isShown}>
      <CrossBtb type="button" onClick={closeLogoutModal}>
        <CrossIconStyled />
      </CrossBtb>
      <ConfirmTitle>{t('logout.confirm')}</ConfirmTitle>
      <BtnWrapper>
        <LogoutBtn type="button" onClick={handleLogoutBtn}>
          {t('logout.acceptBtn')}
        </LogoutBtn>
        <CancelBtn type="button" onClick={closeLogoutModal}>
          {t('logout.cancel')}
        </CancelBtn>
      </BtnWrapper>
    </ModalWrapper>
  );
};

export default LogoutModal;

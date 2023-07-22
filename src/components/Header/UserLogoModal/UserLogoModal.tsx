import { FC } from 'react';
import LogoutBtn from '../LogoutBtn';
import { useTranslation } from 'react-i18next';

import {
  ModalWrapper,
  EditButton,
  EditIconStyled,
} from './UserLogoModal.styled';

export interface IUserLogoModalProps {
  isShown: boolean;
  openEditModal: () => void;
  closeUserLogoModal: () => void;
  openLogoutModal: () => void;
}

const UserLogoModal: FC<IUserLogoModalProps> = ({
  isShown,
  openEditModal,
  closeUserLogoModal,
  openLogoutModal,
}) => {
  const { t } = useTranslation();
  const onEditBtnClick = () => {
    closeUserLogoModal();
    openEditModal();
  };

  const onLogoutBtn = () => {
    openLogoutModal();
    closeUserLogoModal();
  };
  return (
    <ModalWrapper isShown={isShown}>
      <EditButton type="button" onClick={onEditBtnClick}>
        <span>{t('logout.edit')}</span>
        <EditIconStyled width={'14px'} height={'14'} />
      </EditButton>
      <LogoutBtn onLogoutClick={onLogoutBtn} />
    </ModalWrapper>
  );
};

export default UserLogoModal;

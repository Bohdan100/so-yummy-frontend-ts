import { useState, FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import { useAuth } from 'hooks';
import { selectTheme } from 'redux/Theme/themeSelectors';

import Modal from 'components/Modal';
import UserLogoModal from '../UserLogoModal';
import UserInfoModal from '../UserInfoModal';
import LogoutModal from '../LogoutModal';

import { UserButton, UserAvatarImg } from './UserLogo.styled';

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg';

const UserLogo: FC = () => {
  const [isUserLogoModalOpen, setIsUserLogoModalOpen] =
    useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const { pathname } = useLocation();
  const theme = useAppSelector(selectTheme);
  const isRecipesPage = pathname.includes('recipes');

  const color = isRecipesPage || theme === 'light' ? '#22252A' : '#FAFAFA';

  const closeUserLogoModal = () => {
    setIsUserLogoModalOpen(false);
  };

  const openUserInfoModal = () => {
    setIsEditModalOpen(true);
  };

  const closeUserInfoModal = () => {
    setIsEditModalOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <UserButton
        type="button"
        onClick={() => setIsUserLogoModalOpen(!isUserLogoModalOpen)}
        color={color}
      >
        <UserAvatarImg src={user.avatar || DEFAULT_AVATAR} alt="user avatar" />
        <p>{user.name || 'User name'}</p>
      </UserButton>

      {isUserLogoModalOpen && (
        <Modal onClose={closeUserLogoModal}>
          <UserLogoModal
            closeUserLogoModal={closeUserLogoModal}
            isShown={isUserLogoModalOpen}
            openEditModal={openUserInfoModal}
            openLogoutModal={openLogoutModal}
          />
        </Modal>
      )}

      {isEditModalOpen && !isUserLogoModalOpen && (
        <Modal onClose={closeUserInfoModal}>
          <UserInfoModal
            isShown={isEditModalOpen}
            closeUserInfoModal={closeUserInfoModal}
          />
        </Modal>
      )}

      {!isUserLogoModalOpen && isLogoutModalOpen && (
        <Modal onClose={closeLogoutModal}>
          <LogoutModal
            isShown={isLogoutModalOpen}
            closeLogoutModal={closeLogoutModal}
          />
        </Modal>
      )}
    </>
  );
};

export default UserLogo;

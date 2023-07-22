import { useState, FC, ChangeEvent } from 'react';
import { useAuth, useAppDispatch, useAppSelector } from 'hooks';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updateUser } from 'redux/Auth/authOperations';
import { selectTheme } from 'redux/Theme/themeSelectors';

import {
  updateUserValidationSchema,
  SUPPORTED_FORMATS,
} from '../../../helpers';

import { ReactComponent as DefaultAvatar } from '../../../images/icons/user-40.svg';
import { ReactComponent as EditIcon } from '../../../images/icons/edit-01.svg';

import {
  ModalWrapper,
  CloseBtn,
  CrossIconStyled,
  FormStyled,
  UserAvatarWrapper,
  UserImgWrapper,
  InputButtonWrapper,
  NameLabel,
  NameInput,
  UserIconStyled,
  EditBtn,
  SubmitBtn,
  ErrorMessage,
} from './UserInfoModal.styled';

export interface IUserInfoModalProps {
  isShown: boolean;
  closeUserInfoModal: () => void;
}

interface IFormValues {
  avatar: string | File;
  name: string;
}

const UserInfoModal: FC<IUserInfoModalProps> = ({
  isShown,
  closeUserInfoModal,
}) => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [pathToUserAvatar, setPathToUserAvatar] = useState(user.avatar);
  const theme = useAppSelector(selectTheme);
  const { t } = useTranslation();

  const handleSubmit = (values: IFormValues) => {
    if (!values.avatar) {
      values.avatar = user.avatar as string;
    }

    dispatch(updateUser({ name: values.name, avatar: values.avatar }))
      .unwrap()
      .then(() => toast.success(t('editUser.success')))
      .catch(() => toast.error(t('editUser.error')));
    closeUserInfoModal();
  };

  return (
    <ModalWrapper isShown={isShown}>
      <CloseBtn type="button" onClick={closeUserInfoModal}>
        <CrossIconStyled />
      </CloseBtn>

      <Formik<IFormValues>
        initialValues={{
          avatar: '',
          name: user.name || '',
        }}
        validationSchema={updateUserValidationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {props => (
          <FormStyled onSubmit={props.handleSubmit}>
            <UserAvatarWrapper>
              <label htmlFor="avatar">
                {pathToUserAvatar ? (
                  <UserImgWrapper>
                    <img src={pathToUserAvatar} alt="user-avatar" />
                  </UserImgWrapper>
                ) : (
                  <UserImgWrapper>
                    <DefaultAvatar />
                  </UserImgWrapper>
                )}
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onBlur={() => {
                  props.setTouched({
                    avatar: true,
                  });
                }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files && event.target.files[0]) {
                    if (
                      SUPPORTED_FORMATS.includes(event.target.files[0].type)
                    ) {
                      setPathToUserAvatar(
                        window.URL.createObjectURL(event.target.files[0])
                      );
                      props.setFieldValue('avatar', event.target.files[0]);
                    }
                  } else {
                    setPathToUserAvatar(user.avatar);
                  }
                }}
              />
            </UserAvatarWrapper>
            {props.errors.avatar && (
              <ErrorMessage location="file">{props.errors.avatar}</ErrorMessage>
            )}

            <InputButtonWrapper>
              <NameLabel htmlFor="name" id="labelName">
                <NameInput
                  type="text"
                  name="name"
                  id="name"
                  value={props.values.name}
                  border={
                    props.touched.name && props.errors.name
                      ? '1px solid #E74A3B'
                      : props.touched.name && props.isValid
                      ? '1px solid #3CBC81'
                      : theme === 'light'
                      ? '1px solid #23262a'
                      : '1px solid #FAFAFA'
                  }
                  onBlur={() => {
                    props.setTouched({
                      name: true,
                    });
                  }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    props.setTouched({
                      name: true,
                    });
                    props.setFieldValue('name', event.target.value);
                  }}
                />
                <UserIconStyled
                  stroke={
                    props.touched.name && props.errors.name
                      ? '#E74A3B'
                      : props.touched.name && props.isValid
                      ? '#3CBC81'
                      : theme === 'light'
                      ? '#23262a'
                      : '#FAFAFA'
                  }
                />

                {props.values.name && (
                  <EditBtn
                    type="button"
                    onClick={() => props.setFieldValue('name', '')}
                  >
                    <EditIcon />
                  </EditBtn>
                )}
              </NameLabel>
              {props.errors.name ? (
                <ErrorMessage>{props.errors.name}</ErrorMessage>
              ) : null}
              <SubmitBtn
                type="submit"
                disabled={
                  !(
                    (props.touched.name &&
                      props.values.name &&
                      !props.errors.name) ||
                    (props.touched.avatar &&
                      props.values.avatar &&
                      !props.errors.avatar)
                  )
                }
              >
                {t('editUser.saveBtn')}
              </SubmitBtn>
            </InputButtonWrapper>
          </FormStyled>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default UserInfoModal;

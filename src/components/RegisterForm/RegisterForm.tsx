import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useAuth } from 'hooks';
import { selectIsLoading } from 'redux/Auth/authSelectors';
import { register } from 'redux/Auth/authOperations';

import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

import { useValidation, useErrorStatus } from 'helpers';
import { setError } from 'redux/Auth/authSlice';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import PulseLoader from 'react-spinners/PulseLoader';

import {
  UserIconStyled,
  EmailIconStyled,
  LockIconStyled,
  ErrorIconStyled,
  CheckIconStyled,
  PassWarnIconStyled,
  PassErrorIconStyled,
  PassValidIconStyled,
} from '../AuthIcons';

import {
  Container,
  Label,
  Input,
  StyledForm,
  Title,
  InputContainer,
  Button,
  StyledLink,
  StatusBox,
  ErrorBox,
  TitleContainer,
  ShowPasswordBtn,
  PassIconBox,
  GoogleIcon,
  GoogleLink,
} from './RegisterForm.styled';

const RegisterForm: FC = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { error } = useAuth();

  const { ErrorStatus, getPassErrorStatus } = useErrorStatus();

  const { t } = useTranslation();
  const { registerSchema } = useValidation();
  type registerSchemaType = yup.InferType<typeof registerSchema>;
  const registerValidationSchema =
    registerSchema as yup.Schema<registerSchemaType>;

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    }
  }, [dispatch, error]);

  const initialValues: registerSchemaType = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmitForm = (
    { name, email, password }: registerSchemaType,
    { resetForm }: FormikHelpers<registerSchemaType>
  ) => {
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => resetForm())
      .catch(err => toast.error(`Error: ${err}`));
  };

  const statusIcon = {
    valid: <CheckIconStyled />,
    inValid: <ErrorIconStyled />,
    notSecure: <PassWarnIconStyled />,
  };

  const passStatusIcon = {
    valid: <PassValidIconStyled />,
    inValid: <PassErrorIconStyled />,
    notSecure: <PassWarnIconStyled />,
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={registerValidationSchema}
        validateOnBlur
      >
        {({ errors, touched, isValid, dirty }) => (
          <StyledForm>
            <TitleContainer>
              <Title>{t('auth.title.register')}</Title>
              <PulseLoader color="#8BAA36" size={12} loading={isLoading} />
              {error && (
                <ErrorBox>
                  {ErrorStatus[Number(error) as keyof typeof ErrorStatus]}
                </ErrorBox>
              )}
            </TitleContainer>
            <InputContainer>
              <Label htmlFor="name">
                <Input
                  type="text"
                  name="name"
                  placeholder={t('auth.form.name')}
                  disabled={isLoading}
                  color={
                    touched.name
                      ? errors.name
                        ? getPassErrorStatus(errors.name, dirty)
                        : 'valid'
                      : null
                  }
                />
                <UserIconStyled
                  color={
                    touched.name
                      ? errors.name
                        ? getPassErrorStatus(errors.name, dirty)
                        : 'valid'
                      : null
                  }
                />
                {touched.name
                  ? errors.name
                    ? statusIcon[
                        getPassErrorStatus(
                          errors.name,
                          dirty
                        ) as keyof typeof statusIcon
                      ]
                    : statusIcon['valid']
                  : null}
                {errors.name && touched.name ? (
                  <StatusBox>{errors.name}</StatusBox>
                ) : null}
              </Label>

              <Label htmlFor="email">
                <Input
                  type="email"
                  name="email"
                  placeholder={t('auth.form.email')}
                  disabled={isLoading}
                  color={
                    touched.email
                      ? errors.email
                        ? getPassErrorStatus(errors.email, dirty)
                        : 'valid'
                      : null
                  }
                />
                <EmailIconStyled
                  color={
                    touched.email
                      ? errors.email
                        ? getPassErrorStatus(errors.email, dirty)
                        : 'valid'
                      : null
                  }
                />
                {touched.email
                  ? errors.email
                    ? statusIcon[
                        getPassErrorStatus(
                          errors.email,
                          dirty
                        ) as keyof typeof statusIcon
                      ]
                    : statusIcon['valid']
                  : null}
                {errors.email && touched.email ? (
                  <StatusBox>{errors.email}</StatusBox>
                ) : null}
              </Label>

              <Label htmlFor="password">
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={t('auth.form.password')}
                  disabled={isLoading}
                  color={
                    touched.password
                      ? errors.password
                        ? getPassErrorStatus(errors.password, dirty)
                        : 'valid'
                      : null
                  }
                />
                <LockIconStyled
                  color={
                    touched.password
                      ? errors.password
                        ? getPassErrorStatus(errors.password, dirty)
                        : 'valid'
                      : null
                  }
                />
                <PassIconBox>
                  <ShowPasswordBtn
                    type="button"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <AiOutlineEye size="24px" />
                    ) : (
                      <AiOutlineEyeInvisible size="24px" />
                    )}
                  </ShowPasswordBtn>
                  {touched.password
                    ? errors.password
                      ? passStatusIcon[
                          getPassErrorStatus(
                            errors.password,
                            dirty
                          ) as keyof typeof passStatusIcon
                        ]
                      : passStatusIcon['valid']
                    : null}
                </PassIconBox>
                <StatusBox
                  colorHover={
                    touched.password
                      ? errors.password
                        ? getPassErrorStatus(errors.password, dirty)
                        : 'valid'
                      : null
                  }
                >
                  {((dirty && touched.password) ||
                    (!dirty && touched.password && errors.password)) &&
                    (errors.password || t('auth.status.secure'))}
                </StatusBox>
              </Label>
            </InputContainer>
            <GoogleLink to="https://so-yummy-98ev.onrender.com/api/auth/google">
              <GoogleIcon />
            </GoogleLink>
            <Button
              type="submit"
              name="button"
              disabled={isLoading || !isValid || !dirty}
            >
              {t('auth.form.button.register')}
            </Button>
            <StyledLink to="/signin">{t('auth.form.link.login')}</StyledLink>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterForm;

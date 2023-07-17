import { FC } from 'react';
import RegisterForm from 'components/RegisterForm';
import AuthBody from 'components/AuthBody';

const RegisterPage: FC = () => {
  return (
    <AuthBody>
      <RegisterForm />
    </AuthBody>
  );
};

export default RegisterPage;

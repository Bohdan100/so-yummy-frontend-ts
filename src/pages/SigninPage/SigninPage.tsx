import { FC } from 'react';
import SigninForm from 'components/SigninForm/SigninForm';
import AuthBody from 'components/AuthBody';

const SigninPage: FC = () => {
  return (
    <AuthBody>
      <SigninForm />
    </AuthBody>
  );
};

export default SigninPage;

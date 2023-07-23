import { FC, FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';
import { useJwt } from 'react-jwt';

interface IPrivateRouteProps {
  component: FunctionComponent;
  redirectTo: string;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { token } = useAuth();
  // TODO - проверить работает логика если токен expired

  const { isExpired } = useJwt(token!);
  console.log('isExpired', isExpired);

  return !token ? <Navigate to={redirectTo} /> : <Component />;
};

export default PrivateRoute;

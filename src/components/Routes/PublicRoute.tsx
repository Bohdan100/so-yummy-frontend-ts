import { FC, FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';

interface IPublicRouteProps {
  component: FunctionComponent;
  redirectTo: string;
}

const PublicRoute: FC<IPublicRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { token } = useAuth();

  return token ? <Navigate to={redirectTo} /> : <Component />;
};

export default PublicRoute;

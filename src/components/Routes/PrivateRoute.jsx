import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks';
import { useJwt } from 'react-jwt';

export default function PrivateRoute({
  component: Component,
  redirectTo = '/',
}) {
  const { token } = useAuth();
  // TODO - проверить работает логикак если токен expired
  const { isExpired } = useJwt(token);
  console.log('isExpired', isExpired);

  return !token && !isExpired ? <Navigate to={redirectTo} /> : <Component />;
}

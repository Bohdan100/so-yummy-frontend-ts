import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LangSwitcher from 'components/LangSwitcher';
import Loader from 'components/Loader';

const Layout: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LangSwitcher position="absolute" />
      <Outlet />
    </Suspense>
  );
};

export default Layout;

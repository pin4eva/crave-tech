import React from 'react';
import { Navigate } from 'react-router-dom';

interface IProp {
  component: React.ComponentType;
  layout: React.ComponentType;
  isAuth: boolean;
  isProtected: boolean;
}

const AppRoutes = ({
  component: Component,
  layout: Layout,
  isProtected,
  isAuth,
}: IProp) => {
  if (isProtected) {
    if (isAuth) {
      return (
        <Layout>
          <Component />
        </Layout>
      );
    }
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default AppRoutes;

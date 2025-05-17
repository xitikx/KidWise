// components/ProtectedLayout.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import Header from './Header';

const ProtectedLayout = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;

import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadSpinner } from '@/components';
import { ROLE_REDIRECT } from './roleRedirects';

export const PublicRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) return <LoadSpinner styles="fixed bg-gray-200/95" />

  const userRole = auth?.user?.rol;

  return !auth
    ? <Outlet />
    : <Navigate to={ ROLE_REDIRECT[userRole] || "/" } replace />;
};

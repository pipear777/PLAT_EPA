import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context';
import { ROLE_REDIRECT } from './roleRedirects';
import { authRoutesList } from './list';

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { auth, loading } = useAuth();

  if (loading) return <LoadSpinner styles="fixed bg-gray-200/95" />

  if (!auth) return <Navigate to={authRoutesList.login} replace />;

  const userRole = auth?.user?.rol;

  if (allowedRoles.includes(userRole)) return <Outlet />;

  return <Navigate to={ ROLE_REDIRECT[userRole] || "/" } replace />;
};

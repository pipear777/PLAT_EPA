import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useAuth } from '@/context';
import {
  authRoutesList,
  ProtectedRoutes,
  PublicRoutes,
  RoleProtectedRoute,
} from '.';
import {
  AuthRoutes,
  GetAseoRoutesFor,
  GetJuridicaRoutesFor,
  SuperadminRoutes,
} from '@/modules';
import { ROLES } from '@/constants';
import { LoadSpinner } from '@/components';

export const AppRouter = () => {
  const { auth, loading } = useAuth();

  if (loading) return <LoadSpinner styles="fixed bg-gray-200/95" />;

  const router = createBrowserRouter([
    {
      element: <PublicRoutes />,
      children: AuthRoutes,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          element: <RoleProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]} />,
          children: SuperadminRoutes,
        },
        {
          element: (
            <RoleProtectedRoute
              allowedRoles={[
                ROLES.SUPER_ADMIN,
                ROLES.ADMIN_ASEO,
                ROLES.USER_ASEO,
              ]}
            />
          ),
          children: GetAseoRoutesFor(auth?.user?.rol),
        },
        {
          element: (
            <RoleProtectedRoute
              allowedRoles={[
                ROLES.SUPER_ADMIN,
                ROLES.ADMIN_JURIDICA,
                ROLES.USER_JURIDICA,
              ]}
            />
          ),
          children: GetJuridicaRoutesFor(auth?.user?.rol),
        },
      ],
    },
    { path: '*', element: <Navigate to={authRoutesList.login} /> },
  ]);

  return <RouterProvider router={router} />;
};

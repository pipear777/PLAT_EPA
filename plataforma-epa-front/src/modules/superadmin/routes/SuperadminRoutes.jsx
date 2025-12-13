import { SuperadminLayout } from '../layout';
import {
  CreateUsersPage,
  DepartamentsPage,
  GetDepartaments,
  GetLocations,
  GetUsersPage,
  SuperadminDashboardPage,
  UsersPage,
} from '../features';
import { superadminRoutesList } from '@/routes';

export const SuperadminRoutes = [
  {
    path: superadminRoutesList.superadminDashboard,
    element: <SuperadminLayout />,
    children: [
      {
        index: true,
        element: <SuperadminDashboardPage />,
      },
      {
        path: superadminRoutesList.users,
        element: <UsersPage />,
      },
      {
        path: superadminRoutesList.createUsers,
        element: <CreateUsersPage />,
      },
      {
        path: superadminRoutesList.getUsers,
        element: <GetUsersPage />,
      },
      {
        path: superadminRoutesList.departaments,
        element: <DepartamentsPage />,
      },
      {
        path: superadminRoutesList.getDepartaments,
        element: <GetDepartaments />,
      },
      {
        path: superadminRoutesList.getLocations,
        element: <GetLocations />,
      },
    ],
  },
];

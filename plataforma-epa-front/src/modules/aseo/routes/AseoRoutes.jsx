import { aseoRoutesList } from '@/routes';
import {
  AseoDashboardPage,
  CreateOvertimesPage,
  CreateWorkersPage,
  GetOvertimesPage,
  GetWorkersPage,
  OvertimesPage,
  ReportsPage,
  WorkersPage,
} from '../features';
import { ROLES } from '@/constants';

const ASEO_ADMIN = [ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO];
const ASEO_ALL = [ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO, ROLES.USER_ASEO];

export const AseoRoutes = [
  {
    index: true,
    element: <AseoDashboardPage />,
    roles: ASEO_ALL,
  },
  {
    path: aseoRoutesList.overtimes,
    element: <OvertimesPage />,
    roles: ASEO_ADMIN,
  },
  {
    path: aseoRoutesList.createOvertimes,
    element: <CreateOvertimesPage />,
    roles: ASEO_ADMIN,
  },
  {
    path: aseoRoutesList.getOvertimes,
    element: <GetOvertimesPage />,
    roles: ASEO_ALL,
  },
  {
    path: aseoRoutesList.workers,
    element: <WorkersPage />,
    roles: ASEO_ADMIN,
  },
  {
    path: aseoRoutesList.createWorkers,
    element: <CreateWorkersPage />,
    roles: ASEO_ADMIN,
  },
  {
    path: aseoRoutesList.getWorkers,
    element: <GetWorkersPage />,
    roles: ASEO_ALL,
  },
  {
    path: aseoRoutesList.reports,
    element: <ReportsPage />,
    roles: ASEO_ALL,
  },
];

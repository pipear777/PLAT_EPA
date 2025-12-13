import { juridicaRoutesList } from '@/routes';
import {
  JuridicaDashboardPage,
  HistoricalPage,
  ContractsPage,
  CreateContractsPage,
  GetContractsPage,
  LawyersPage,
} from '../features';
import { ROLES } from '@/constants';

const JURIDICA_ADMIN = [ROLES.SUPER_ADMIN, ROLES.ADMIN_JURIDICA];
const JURIDICA_ALL = [ROLES.SUPER_ADMIN, ROLES.ADMIN_JURIDICA, ROLES.USER_JURIDICA];

export const JuridicaRoutes = [
  {
    index: true,
    element: <JuridicaDashboardPage />,
    roles: JURIDICA_ALL,
  },
  {
    path: juridicaRoutesList.contracts,
    element: <ContractsPage />,
    roles: JURIDICA_ADMIN,
  },
  {
    path: juridicaRoutesList.createContracts,
    element: <CreateContractsPage />,
    roles: JURIDICA_ADMIN,
  },
  {
    path: juridicaRoutesList.listContracts,
    element: <GetContractsPage />,
    roles: JURIDICA_ALL,
  },
  {
    path: juridicaRoutesList.lawyers,
    element: <LawyersPage />,
    roles: JURIDICA_ALL,
  },
  {
    path: juridicaRoutesList.historical,
    element: <HistoricalPage />,
    roles: JURIDICA_ALL,
  },
];

import { juridicaRoutesList } from '@/routes';
import { JuridicaLayout } from '../layout/JuridicaLayout';
import { JuridicaRoutes } from '.';

export const GetJuridicaRoutesFor = (role) => {
  const filteredRoutes = JuridicaRoutes.filter((route) => {
    if (!route.roles) return true;
    return route.roles.includes(role);
  });

  return [
    {
      path: juridicaRoutesList.juridicaDashboard,
      element: <JuridicaLayout />,
      children: filteredRoutes,
    },
  ];
};

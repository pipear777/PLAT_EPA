import { aseoRoutesList } from '@/routes';
import { AseoLayout } from '../layout';
import { AseoRoutes } from '.';
import { AseoProvider } from '../context';

export const GetAseoRoutesFor = (role) => {
  const filteredRoutes = AseoRoutes.filter((route) => {
    if (!route.roles) return true;
    return route.roles.includes(role);
  });

  return [
    {
      path: aseoRoutesList.aseoDashboard,
      element: (
        <AseoProvider>
          <AseoLayout/>
        </AseoProvider>
      ),
      children: filteredRoutes,
    },
  ];
};

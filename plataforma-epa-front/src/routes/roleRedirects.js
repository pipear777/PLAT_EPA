import {
  aseoRoutesList,
  juridicaRoutesList,
  superadminRoutesList,
} from './list';

export const ROLE_REDIRECT = {
  AdminAseo: aseoRoutesList.aseoDashboard,
  UsuarioAseo: aseoRoutesList.aseoDashboard,
  AdminJuridica: juridicaRoutesList.juridicaDashboard,
  UsuarioJuridica: juridicaRoutesList.juridicaDashboard,
  SuperAdministrador: superadminRoutesList.superadminDashboard,
};

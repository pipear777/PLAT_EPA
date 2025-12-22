// layout/components/Sidebar/sidebar.config.js
import {
  House,
  Users,
  Blocks,
  BrushCleaning,
  Scale,
  ClipboardClock,
  NotebookPen,
  Folders,
} from 'lucide-react';

import {
  superadminRoutesList,
  aseoRoutesList,
  juridicaRoutesList,
} from '@/routes';

import { ROLES } from '@/constants';

export const SIDEBAR_ITEMS = [
  // ===== SUPER ADMIN =====
  {
    label: 'Inicio Admin',
    icon: House,
    to: superadminRoutesList.superadminDashboard,
    roles: [ROLES.SUPER_ADMIN],
    module: ['SUPERADMIN', 'ASEO', 'JURIDICA'],
  },
  {
    label: 'Usuarios',
    icon: Users,
    to: superadminRoutesList.users,
    roles: [ROLES.SUPER_ADMIN],
    module: ['SUPERADMIN'],
  },
  {
    label: 'Procesos',
    icon: Blocks,
    to: superadminRoutesList.departaments,
    roles: [ROLES.SUPER_ADMIN],
    module: ['SUPERADMIN'],
  },
  {
    label: 'Modulo Aseo',
    icon: BrushCleaning,
    to: aseoRoutesList.aseoDashboard,
    roles: [ROLES.SUPER_ADMIN],
    module: ['SUPERADMIN'],
  },
  {
    label: 'Modulo Jurídica',
    icon: Scale,
    to: juridicaRoutesList.juridicaDashboard,
    roles: [ROLES.SUPER_ADMIN],
    module: ['SUPERADMIN'],
  },

  // ===== ASEO =====
  {
    label: 'Inicio Aseo',
    icon: House,
    to: aseoRoutesList.aseoDashboard,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO, ROLES.USER_ASEO],
    module: ['ASEO'],
  },
  {
    label: 'Horas Extra',
    icon: ClipboardClock,
    to: aseoRoutesList.overtimes,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO],
    module: ['ASEO'],
  },
  {
    label: 'Horas Extra',
    icon: ClipboardClock,
    to: aseoRoutesList.getOvertimes,
    roles: [ROLES.USER_ASEO],
    module: ['ASEO'],
  },
  {
    label: 'Funcionarios',
    icon: Users,
    to: aseoRoutesList.workers,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO],
    module: ['ASEO'],
  },
  {
    label: 'Funcionarios',
    icon: Users,
    to: aseoRoutesList.getWorkers,
    roles: [ROLES.USER_ASEO],
    module: ['ASEO'],
  },
  {
    label: 'Reportes',
    icon: NotebookPen,
    to: aseoRoutesList.reports,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN_ASEO, ROLES.USER_ASEO],
    module: ['ASEO'],
  },

  // ===== JURIDICA =====
  {
    label: 'Inicio Jurídica',
    icon: House,
    to: juridicaRoutesList.juridicaDashboard,
    roles: [ROLES.USER_JURIDICA, ROLES.ADMIN_JURIDICA, ROLES.SUPER_ADMIN],
    module: ['JURIDICA'],
  },
  {
    label: 'Contratos',
    icon: NotebookPen,
    to: juridicaRoutesList.contracts,
    roles: [ROLES.ADMIN_JURIDICA, ROLES.SUPER_ADMIN],
    module: ['JURIDICA'],
  },
  {
    label: 'Contratos',
    icon: NotebookPen,
    to: juridicaRoutesList.listContracts,
    roles: [ROLES.USER_JURIDICA],
    module: ['JURIDICA'],
  },
  {
    label: 'Abogados',
    icon: Users,
    to: juridicaRoutesList.lawyers,
    roles: [ROLES.USER_JURIDICA, ROLES.ADMIN_JURIDICA, ROLES.SUPER_ADMIN],
    module: ['JURIDICA'],
  },
  {
    label: 'Histórico',
    icon: Folders,
    to: juridicaRoutesList.historical,
    roles: [ROLES.USER_JURIDICA, ROLES.ADMIN_JURIDICA, ROLES.SUPER_ADMIN],
    module: ['JURIDICA'],
  },
];

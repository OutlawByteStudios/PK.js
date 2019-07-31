// General Routes
import Home from './pages/home';
import CreateServer from './pages/create-server';
import Profile from './pages/profile';

// Server Routes
import Dashboard from './pages/dashboard';
import ServerManagement from './pages/server-management';
import Admins from './pages/admins';
import AdminLogs from './pages/admin-logs';
import Players from './pages/players';
import PlayersByIP from './pages/players-by-ip';
import LogSearch from './pages/log-search';

const pathPrefix = '/admin';

const generalRoutes = [
  {
    path: pathPrefix + '/',
    exact: true,
    name: "Home",
    icon: "fas fa-home",
    component: Home
  },
  {
    path: pathPrefix + '/create-server',
    exact: true,
    name: "Create Server",
    icon: "fas fa-plus-square",
    component: CreateServer,
    requiredPermission: 'panelAdmin'
  },
  {
    path: pathPrefix + '/profile/:steamID',
    exact: true,
    name: "Profile",
    component: Profile,
    displayInSidebar: false
  }
];

const serverRoutes = [
  {
    path: pathPrefix + '/:serverID',
    exact: true,
    name: "Dashboard",
    icon: "fas fa-desktop",
    component: Dashboard
  },

  {
    path: pathPrefix + '/:serverID/server-management',
    exact: true,
    name: "Server Management",
    icon: "fas fa-server",
    component: ServerManagement
  },

  {
    path: pathPrefix + '/:serverID/admins/:steamID',
    exact: true,
    name: "Admins",
    icon: "fas fa-user-shield",
    component: Admins,
    displayInSidebar: false,
    requiredPermission: 'viewAdminPermissions'
  },
  {
    path: pathPrefix + '/:serverID/admins',
    exact: false,
    name: "Admins",
    icon: "fas fa-user-shield",
    component: Admins,
    requiredPermission: 'viewAdminPermissions'
  },

  {
    path: pathPrefix + '/:serverID/admin-logs',
    exact: false,
    name: "Admin Logs",
    icon: "fas fa-clipboard-list",
    component: AdminLogs,
  },

  {
    path: pathPrefix + '/:serverID/players/:guid',
    exact: true,
    name: "Players",
    icon: "fas fa-users",
    component: Players,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/players',
    exact: false,
    name: "Players",
    icon: "fas fa-users",
    component: Players
  },

  {
    path: pathPrefix + '/:serverID/playersbyip/:ipMask',
    exact: true,
    name: "Players by IP",
    icon: "fas fa-users",
    component: PlayersByIP,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/playersbyip',
    exact: false,
    name: "Players by IP",
    icon: "fas fa-users",
    component: PlayersByIP
  },
  {
    path: pathPrefix + '/:serverID/logs/:searchString',
    exact: false,
    name: "Logs",
    icon: "fas fa-clipboard-list",
    component: LogSearch,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/logs',
    exact: false,
    name: "Logs",
    icon: "fas fa-clipboard-list",
    component: LogSearch
  }
];

export {
  generalRoutes,
  serverRoutes
};
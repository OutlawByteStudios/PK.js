// General Routes
import Home from './pages/home';
import CreateServer from './pages/create-server';
import Profile from './pages/profile';

// Server Routes
import Dashboard from './pages/dashboard';
import Admins from './pages/admins';
import Players from './pages/players';

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
  }
];

export {
  generalRoutes,
  serverRoutes
};
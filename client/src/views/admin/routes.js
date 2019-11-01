// General Routes
import Home from './pages/home';
import CreateServer from './pages/create-server';
import ItemIDs from './pages/item-ids';

// Server Routes
import Dashboard from './pages/dashboard';
import ServerManagement from './pages/server-management';
import ServerStats from './pages/server-stats';
import Admins from './pages/admins';
import AdminLogs from './pages/admin-logs';
import Players from './pages/players';
import PlayersByIP from './pages/players-by-ip';
import LogSearch from './pages/log-search';
import BanList from './pages/ban-list';
import RichestPlayers from './pages/richest-players';

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
    path: pathPrefix + '/item-ids',
    exact: true,
    name: "Item IDs",
    icon: "fas fa-list-ol",
    component: ItemIDs
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
    component: ServerManagement,
    requiresPermission: [
      'renameServer',
      'viewServerFiles',
      'editConfigFiles',
      'manageServerInstance',
      'clearPlayerLocations'
    ]
  },

  {
    path: pathPrefix + '/:serverID/stats',
    exact: true,
    name: "Server Stats",
    icon: "fas fa-chart-line",
    component: ServerStats,
    requiresPermission: [
      'viewServerStats'
    ]
  },

  {
    path: pathPrefix + '/:serverID/admins/:steamID',
    exact: true,
    name: "Admins",
    icon: "fas fa-user-shield",
    component: Admins,
    displayInSidebar: false
  },
  {
    path: pathPrefix + '/:serverID/admins',
    exact: false,
    name: "Admins",
    icon: "fas fa-user-shield",
    component: Admins
  },

  {
    path: pathPrefix + '/:serverID/admin-logs',
    exact: false,
    name: "Admin Logs",
    icon: "fas fa-clipboard-list",
    component: AdminLogs,
    requiresPermission: [
      'viewAdminLogs'
    ]
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
    component: Players,
    requiresPermission: [
      'viewPlayerInfo',
      'adjustGold',
      'stripPlayer',
      'wipePlayerNames',
      'viewBans',
      'manageBans',
      'deleteBans',
      'viewWarnings',
      'createWarnings',
      'deleteWarnings',
      'viewNotes',
      'createNotes',
      'deleteNotes',
      'viewIPRecords',
      'viewIPs'
    ]
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
    component: PlayersByIP,
    requiresPermission: [
      'viewIPRecords',
      'viewIPs'
    ]
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
    component: LogSearch,
    requiresPermission: [
      'viewServerLogs'
    ]
  },
  {
    path: pathPrefix + '/:serverID/ban-list',
    exact: false,
    name: "Ban List",
    icon: "fas fa-clipboard-list",
    component: BanList,
    requiresPermission: [
      'viewBans'
    ]
  },
  {
    path: pathPrefix + '/:serverID/richest-players',
    exact: false,
    name: "Richest Players",
    icon: "fas fa-university",
    component: RichestPlayers
  }
];

export {
  generalRoutes,
  serverRoutes
};
import Home from './pages/home';
import Player from './pages/player';
import ServerInfo from './pages/server-info';
import RichestPlayers from './pages/richest-players';

const pathPrefix = '/player';

const routes = [
  {
    path: pathPrefix + '/',
    exact: true,
    name: "Home",
    icon: "fas fa-home",
    component: Home
  },
  {
    path: pathPrefix + '/:serverID/:guid/',
    exact: true,
    name: "Player",
    icon: "fas fa-user",
    component: Player,
    displayWhenPlayerSelected: true
  },
  {
    path: pathPrefix + '/:serverID/:guid/server',
    exact: true,
    name: "Server Info",
    icon: "fas fa-server",
    component: ServerInfo,
    displayWhenPlayerSelected: true
  },
  {
    path: pathPrefix + '/:serverID/:guid/richest-players',
    exact: true,
    name: "Richest Players",
    icon: "fas fa-university",
    component: RichestPlayers,
    displayWhenPlayerSelected: true
  }
];

export default routes;
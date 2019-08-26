import Home from './pages/home';
import Player from './pages/player';

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
  }
];

export default routes;
import Home from './pages/home';

const pathPrefix = '/player';

const routes = [
  {
    path: pathPrefix + '/',
    exact: true,
    name: "Home",
    icon: "fas fa-home",
    component: Home
  }
];

export default routes;
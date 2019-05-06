import Home from './views/home';
import Login from './views/login';


const routes = [
  {
    path: '/',
    name: "Home",
    icon: "fas fa-home",
    component: Home
  },
  {
    path: '/login',
    name: "Login",
    icon: "fas fa-key",
    component: Login
  }
];

export default routes;
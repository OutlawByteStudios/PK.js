import React from 'react';
import ProtectedRoute from '../../components/utils/protected-route';

import { generalRoutes, serverRoutes } from './routes';

function createRoutes(){
  const routes = generalRoutes.concat(serverRoutes);
  return routes.map((route, key) => (
    <ProtectedRoute
      path={route.path}
      redirect={'/login'}
      exact={route.exact}
      component={route.component}
      key={key}
    />
  ));
}

export default createRoutes();
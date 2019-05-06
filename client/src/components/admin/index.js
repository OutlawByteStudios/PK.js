import React from 'react';
import { Route } from 'react-router-dom';

import { generalRoutes, serverRoutes } from './routes';

function createRoutes(){
  const routes = generalRoutes.concat(serverRoutes);
  return routes.map((route, key) => (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
      key={key}
    />
  ));
}

export default createRoutes();
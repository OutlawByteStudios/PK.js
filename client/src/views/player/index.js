import React from 'react';
import ProtectedRoute from '../../components/misc/protected-route';

import routes from './routes';

function createRoutes(){
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
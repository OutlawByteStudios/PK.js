import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Auth from '../../utils/auth';

class ProtectedRoute extends React.Component {
  render(){
    let authFunction = this.props.authFunction || function(){
      return Auth.isLoggedIn;
    };

    if(authFunction()){
      return <Route { ...this.props } />;
    } else {
      return <Redirect from={this.props.path} to={this.props.redirect} />;
    }
  }
}

export default ProtectedRoute;
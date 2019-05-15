import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import Auth from './utils/auth';

import indexRoutes from './views/public';
import adminRoutes from './views/admin';

const client = new ApolloClient({
  request: async (operation) => {
    operation.setContext({
      headers: {
        JWT: Auth.jwtToken
      }
    })
  }
});

class App extends React.Component {
  state = {
    initialSetup: false
  };

  componentDidMount(){
    Auth.restoreAuth();
    this.setState({ initialSetup: true });
  }

  render(){
    if(this.state.initialSetup === false) return null; // dont render app until initial setup is completed
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            {indexRoutes}
            {adminRoutes}
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;
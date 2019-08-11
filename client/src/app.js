import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Auth from './utils/auth';

import indexRoutes from './views/public';
import adminRoutes from './views/admin';

const client = new ApolloClient({
  request: async (operation) => {
    operation.setContext({ headers: { JWT: Auth.jwtToken } });
  },
  cache: new InMemoryCache({
    dataIdFromObject: obj => {
      switch (obj.__typename) {
        case 'serverconfigfile':
          return obj.name;
        case 'item':
          return obj.id;
        default:
          return obj._id;
      }
    }
  })
});

client.defaultOptions = {
  watchQuery: {
    errorPolicy: 'all',
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  },
  mutate: {
    errorPolicy: 'all',
  }
};

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
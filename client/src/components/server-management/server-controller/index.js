import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONTROLLER } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class ServerController extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_CONTROLLER}
        variables={{
          serverID: this.props.serverID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          return (
            <Component
              serverID={this.props.serverID}
              online={data.server.gameserverOnline}
              lastModule={data.server.gameserverLastModule}
              lastConfig={data.server.gameserverLastConfig}
            />
          );
        }}
      </Query>
    );
  }
}

export default ServerController;
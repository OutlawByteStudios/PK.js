import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONTROLLER } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class ServerController extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_CONTROLLER}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          if(data.adminPermission.viewServerFiles === 0) return <NoPermission/>;

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
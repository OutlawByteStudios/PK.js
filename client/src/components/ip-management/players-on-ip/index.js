import React from 'react';
import { Query } from 'react-apollo';

import { PLAYERS_ON_IP } from '../../../graphql/queries/index';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class Player extends React.Component{
  render(){
    return (
      <Query
        query={PLAYERS_ON_IP}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID,
          ipMask: this.props.ipMask
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          if(data.adminPermission.viewIPRecords === 0) return <NoPermission/>;

          return (
            <Component
              serverID={this.props.serverID}
              ipRecords={data.server.ipRecords}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
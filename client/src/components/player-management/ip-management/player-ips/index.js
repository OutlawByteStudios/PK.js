import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_IPS } from '../../../../graphql/queries/index';

import Auth from '../../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class PlayerIPs extends React.Component{
  render(){
    return (
      <Query
        query={PLAYER_IPS}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID,
          guid: this.props.guid
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          // if ipRecords is blank have no permission to view them
          if(data.adminPermission.viewIPRecords === 0) return <NoPermission />;

          return (
            <Component
              ipRecords={data.server.player.ipRecords}
            />
          );
        }}
      </Query>
    );
  }
}

export default PlayerIPs;
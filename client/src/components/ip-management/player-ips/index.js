import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_IPS } from '../../../graphql/queries/index';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import NotFound from './not-found';
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

          if(data.server.player === null) return <NotFound/>;

          return (
            <Component
              serverID={this.props.serverID}
              ipRecords={data.server.player.ipRecords}
              ipLinkedRecords={data.server.player.ipLinkedRecords}
            />
          );
        }}
      </Query>
    );
  }
}

export default PlayerIPs;
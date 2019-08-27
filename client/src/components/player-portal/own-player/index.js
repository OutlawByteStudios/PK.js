import React from 'react';
import { Query } from 'react-apollo';

import { OWN_PLAYER } from '../../../graphql/queries/index';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NotFound from './not-found';
import NoPermission from './no-permission';
import Component from './component';

class OwnPlayer extends React.Component{
  render(){
    return (
      <Query
        query={OWN_PLAYER}
        variables={{
          serverID: this.props.serverID,
          guid: this.props.guid
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          if(data.server.player === null) return <NotFound/>;

          // if this is null then they should not be able to see this as they're
          // looking at a different player
          if(data.server.player.linkedSteamUser.steamID !== Auth.claim.steamID) return <NoPermission />;

          return (
            <Component
              serverID={this.props.serverID}
              player={data.server.player}
            />
          );
        }}
      </Query>
    );
  }
}

export default OwnPlayer;
import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NotFound from './not-found';
import HalfComponent from './half-component';
import FullComponent from './full-component';

class Player extends React.Component{
  render(){
    return (
      <Query
        query={PLAYER}
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

          if(data.server.player === null) return <NotFound/>;

          if(data.adminPermission.viewPlayerInfo === 0) return (
            <HalfComponent
              serverID={this.props.serverID}
              player={data.server.player}
            />
          );

          return (
            <FullComponent
              serverID={this.props.serverID}
              player={data.server.player}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_NAMES } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import NotFound from './not-found';
import NoPermission from './no-permission';
import Component from './component';

class PlayerNames extends React.Component{
  render(){
    return (
      <Query
        query={PLAYER_NAMES}
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
          if(data.server.player.playerNames === null) return <NoPermission />;

          return (
            <Component
              serverID={this.props.serverID}
              guid={this.props.guid}
              names={data.server.player.playerNames}
            />
          );
        }}
      </Query>
    );
  }
}

export default PlayerNames;
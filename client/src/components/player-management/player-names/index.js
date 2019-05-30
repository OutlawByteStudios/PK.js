import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_NAMES } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class Player extends React.Component{
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

          return (
            <Component
              names={data.server.player.playerNames}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
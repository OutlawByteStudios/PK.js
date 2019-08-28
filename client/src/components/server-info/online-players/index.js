import React from 'react';
import { Query } from 'react-apollo';

import { ONLINE_PLAYERS } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class Player extends React.Component{
  render(){
    return (
      <Query
        query={ONLINE_PLAYERS}
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
              playerPortal={this.props.playerPortal}
              onlinePlayers={data.server.onlinePlayers}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
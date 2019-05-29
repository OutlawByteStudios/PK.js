import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER } from '../../../queries';

import { Player as PlayerBase } from '../../../../components';

class Player extends React.Component{
  render(){
    return (
      <Query
        query={PLAYER}
        variables={{
          serverID: this.props.serverID,
          guid: this.props.guid
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => (
          <PlayerBase
            loading={loading}
            errors={(error) ? error.graphQLErrors : error}
            player={(data.server) ? data.server.player : null}
            {...this.props}
          />
        )}
      </Query>
    );
  }
}

export default Player;
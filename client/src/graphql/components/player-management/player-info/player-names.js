import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_NAMES } from '../../../queries';

import { PlayerNames as PlayerNamesBase } from '../../../../components';

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
        {({ loading, error, data }) => (
          <PlayerNamesBase
            loading={loading}
            errors={(error) ? error.graphQLErrors : error}
            names={(data.server) ? data.server.player.playerNames : null}
            {...this.props}
          />
        )}
      </Query>
    );
  }
}

export default PlayerNames;
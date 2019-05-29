import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_OFFENCES } from '../../../queries';

import { PlayerOffences as PlayerOffencesBase } from '../../../../components';

class PlayerOffences extends React.Component{
  render(){
    return (
      <Query
        query={PLAYER_OFFENCES}
        variables={{
          serverID: this.props.serverID,
          guid: this.props.guid
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => (
          <PlayerOffencesBase
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

export default PlayerOffences;
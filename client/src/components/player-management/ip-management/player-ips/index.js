import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER_IPS } from '../../../../graphql/queries/index';

import Loader from './loader';
import Error from './error';
import Component from './component';

class PlayerIPs extends React.Component{
  render(){
    return (
      <Query
        query={PLAYER_IPS}
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
              ipRecords={data.server.player.ipRecords}
            />
          );
        }}
      </Query>
    );
  }
}

export default PlayerIPs;
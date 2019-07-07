import React from 'react';
import { Query } from 'react-apollo';

import { PLAYERS_ON_IP } from '../../../../graphql/queries/index';

import Loader from './loader';
import Error from './error';
import Component from './component';

class Player extends React.Component{
  render(){
    return (
      <Query
        query={PLAYERS_ON_IP}
        variables={{
          serverID: this.props.serverID,
          ipMask: this.props.ipMask
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          return (
            <Component
              ipRecords={data.server.ipRecords}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
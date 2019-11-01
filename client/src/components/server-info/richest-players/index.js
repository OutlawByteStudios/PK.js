import React from 'react';
import { Query } from 'react-apollo';

import { RICHEST_PLAYERS } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class RichestPlayers extends React.Component{
  render(){
    return (
      <Query
        query={RICHEST_PLAYERS}
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
              richestPlayers={data.server.richestPlayers}
            />
          );
        }}
      </Query>
    );
  }
}

export default RichestPlayers;
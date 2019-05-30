import React from 'react';
import { Query } from 'react-apollo';

import { PLAYER } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

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
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          return (
            <Component
              player={data.server.player}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
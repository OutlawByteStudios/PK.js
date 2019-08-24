import React from 'react';
import { Query } from 'react-apollo';

import { LINKED_PLAYERS } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class LinkedPlayers extends React.Component{
  render(){
    return (
      <Query
        query={LINKED_PLAYERS}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          return (
            <Component
              linkedPlayers={data.linkedPlayers}
            />
          );
        }}
      </Query>
    );
  }
}

export default LinkedPlayers;
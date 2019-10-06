import React from 'react';
import { Query } from 'react-apollo';

import { BAN_LIST } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import NotFound from './not-found';
import Component from './component';

class Player extends React.Component{
  render(){
    return (
      <Query
        query={BAN_LIST}
        variables={{
          serverID: this.props.serverID,
          active: this.props.active
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          if(data.server === null) return <NotFound />;

          return (
            <Component
              serverID={this.props.serverID}
              active={this.props.active}
              bans={data.server.bans}
            />
          );
        }}
      </Query>
    );
  }
}

export default Player;
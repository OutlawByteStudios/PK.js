import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_STATUS } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

class ServerInfo extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_STATUS}
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
              serverStatus={data.server.serverStatus}
            />
          );
        }}
      </Query>
    );
  }
}

export default ServerInfo;
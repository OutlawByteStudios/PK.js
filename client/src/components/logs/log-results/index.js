import React from 'react';
import { Query } from 'react-apollo';

import { LOG_SEARCH } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import NotFound from './not-found';
import Component from './component';

class LogResults extends React.Component{
  render(){
    return (
      <Query
        query={LOG_SEARCH}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID,
          searchString: this.props.searchString
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error />;

          if(data.adminPermission.viewServerLogs === 0) return <NoPermission />;

          if(data.server.logSearch === '[]') return <NotFound />;

          return (
            <Component
              logs={JSON.parse(data.server.logSearch)}
            />
          );
        }}
      </Query>
    );
  }
}

export default LogResults;
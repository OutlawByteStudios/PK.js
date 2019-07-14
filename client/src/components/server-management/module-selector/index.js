import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_MODULES } from '../../../graphql/queries';

import Auth from '../../../utils/auth';

import Loader from './loader';
import NoPermission from './no-permission';
import Component from './component';

class ModuleSelector extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_MODULES}
        variables={{
          serverID: this.props.serverID,
          steamID:  Auth.claim.steamID
        }}
        fetchPolicy="cache-and-network"
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <p>Error</p>;

          if(data.adminPermission.viewServerFiles === 0) return <NoPermission/>;

          return (
            <Component
              modules={data.server.modules}
              selectedModule={this.props.selectedModule}
              onChange={this.props.onChange}
              disabled={this.props.disabled}
            />
          );
        }}
      </Query>
    );
  }
}

export default ModuleSelector;
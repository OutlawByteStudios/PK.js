import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONFIGS } from '../../../../graphql/queries';

import Auth from '../../../../utils/auth';

import Loader from './loader';
import NoPermission from './no-permission';
import Component from './component';

class ConfigSelector extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_CONFIGS}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <p>Error</p>;

          if(data.adminPermission.viewServerFiles === 0) return <NoPermission/>;

          return (
            <Component
              configs={data.server.serverConfigFiles}
              selectedConfig={this.props.selectedConfig}
              onChange={this.props.onChange}
              newConfig={this.props.newConfig}
              disabled={this.props.disabled}
            />
          );
        }}
      </Query>
    );
  }
}

export default ConfigSelector;
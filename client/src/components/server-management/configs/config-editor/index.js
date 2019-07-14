import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONFIG } from '../../../../graphql/queries';

import Auth from '../../../../utils/auth';

import Loader from './loader';
import Error from './error';
import NoPermission from './no-permission';
import Component from './component';

class ConfigEditor extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_CONFIG}
        variables={{
          serverID: this.props.serverID,
          steamID: Auth.claim.steamID,
          name: this.props.config
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <Error/>;

          if(data.adminPermission.viewServerFiles === 0) return <NoPermission/>;

          return (
            <Component
              serverID={this.props.serverID}
              name={this.props.config}
              config={(data.server.serverConfigFile !== null) ? data.server.serverConfigFile.config : ''}
              key={this.props.config}
            />
          );
        }}
      </Query>
    );
  }
}

export default ConfigEditor;
import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONFIG } from '../../../../graphql/queries';

import Loader from './loader';
import Component from './component';

class ConfigEditor extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_CONFIG}
        variables={{
          serverID: this.props.serverID,
          name: this.props.config
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <p>Error</p>;

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
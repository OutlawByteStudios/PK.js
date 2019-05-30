import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONFIGS } from '../../../../graphql/queries';

import Loader from './loader';
import Component from './component';

class ConfigSelector extends React.Component{
  render(){
    return (
      <Query
        query={SERVER_CONFIGS}
        variables={{
          serverID: this.props.serverID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return <Loader />;
          if(error) return <p>Error</p>;

          return (
            <Component
              configs={data.server.serverConfigFiles}
              selectedConfig={this.props.selectedConfig}
              onChange={this.props.onChange}
            />
          );
        }}
      </Query>
    );
  }
}

export default ConfigSelector;
import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONFIG } from '../../../queries';

import { ConfigEditor as ConfigEditorBase } from '../../../../components';

class ConfigSelector extends React.Component{
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
        {({ loading, error, data }) => (
          <ConfigEditorBase
            loading={loading}
            errors={(error) ? error.graphQLErrors : error}
            configFile={(data.server) ? data.server.serverConfigFile : null}
            {...this.props}
          />
          )}
      </Query>
    );
  }
}

export default ConfigSelector;
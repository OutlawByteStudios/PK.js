import React from 'react';
import { Query } from 'react-apollo';

import { SERVER_CONFIGS } from '../../../queries';

import { ConfigSelector as ConfigSelectorBase } from '../../../../components';

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
        {({ loading, error, data }) => (
          <ConfigSelectorBase
            loading={loading}
            errors={(error) ? error.graphQLErrors : error}
            configs={(data.server) ? data.server.serverConfigFiles : null}
            {...this.props}
          />
          )}
      </Query>
    );
  }
}

export default ConfigSelector;
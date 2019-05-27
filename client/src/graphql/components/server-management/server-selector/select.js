import React from 'react';
import { Query } from 'react-apollo';

import Auth from '../../../../utils/auth';

import { OWN_ADMIN_PERMISSIONS } from '../../../queries';

import { ServerSelectorSelect as ServerSelectorSelectBase } from '../../../../components';

class ServerSelectorSelect extends React.Component{
  render(){
    return (
      <Query
        query={OWN_ADMIN_PERMISSIONS}
        variables={{
          steamID: Auth.claim.steamID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => (
          <ServerSelectorSelectBase
            loading={loading}
            errors={(error) ? error.graphQLErrors : error}
            adminPermissions={(data) ? data.adminPermissions : null}
            {...this.props}
          />
        )}
      </Query>
    );
  }
}

export default ServerSelectorSelect;
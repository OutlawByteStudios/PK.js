import React from 'react';
import { Query } from 'react-apollo';

import { ADMIN_PERMISSIONS } from '../../queries';

import { AdminList as AdminListBase } from '../../../components';

class AdminList extends React.Component{
  render(){
    return (
      <Query
        query={ADMIN_PERMISSIONS}
        variables={{
          serverID: this.props.serverID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => (
          <AdminListBase
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

export default AdminList;
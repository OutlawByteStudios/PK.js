import React from 'react';
import { Query } from 'react-apollo';

import { ADMIN_PERMISSIONS } from '../../../graphql/queries';

import Component from './component';

class SelectAdmin extends React.Component{
  render(){
    return (
      <Query
        query={ADMIN_PERMISSIONS}
        variables={{
          serverID: this.props.serverID
        }}
        onError={() => {}}
      >
        {({ loading, error, data }) => {
          if(loading) return 'Loading...';
          if(error) return 'Error...';

          return (
            <Component
              admins={data.adminPermissions.map(adminPermission => adminPermission.admin)}
              selectedAdmin={this.props.selectedAdmin}
              onChange={this.props.onChange}
            />
          );
        }}
      </Query>
    );
  }
}

export default SelectAdmin;
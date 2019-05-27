import React from 'react';
import { Mutation } from 'react-apollo';

import { ADMIN_PERMISSIONS } from '../../queries';
import { ADD_ADMIN_PERMISSION } from '../../mutations';

import { AddAdmin as AddAdminBase } from '../../../components';

class AddAdmin extends React.Component{
  render(){
    return (
      <Mutation
        mutation={ADD_ADMIN_PERMISSION}
        update={(cache, { data: { addAdminPermission }}) => {
          let { adminPermissions } = cache.readQuery({
            query: ADMIN_PERMISSIONS,
            variables: {
              serverID: this.props.serverID
            }
          });

          adminPermissions = adminPermissions.concat([addAdminPermission]);

          cache.writeQuery({
            query: ADMIN_PERMISSIONS,
            variables: {
              serverID: this.props.serverID
            },
            data: { adminPermissions: adminPermissions },
          });
        }}
        onError={() => {}}
      >
        {(addAdminPermission, { data, loading, error }) => (
          <AddAdminBase
            action={variables => addAdminPermission({ variables })}
            loading={loading}
            errors={(error) ? error.graphQLErrors: error}
            {...this.props}
          />
        )}
      </Mutation>
    );
  }
}

export default AddAdmin;
import React from 'react';
import { Mutation } from 'react-apollo';

import { REMOVE_ADMIN_PERMISSION } from '../../mutations';

import { RemoveAdmin as RemoveAdminBase } from '../../../components';
import ADMIN_PERMISSIONS from "../../queries/admin-management/admin-permissions";

class RemoveAdmin extends React.Component{
  render(){
    return (
      <Mutation
        mutation={REMOVE_ADMIN_PERMISSION}
        update={(cache, { data: { removeAdminPermission }}) => {
          let { adminPermissions } = cache.readQuery({
            query: ADMIN_PERMISSIONS,
            variables: {
              serverID: this.props.serverID
            }
          });

          adminPermissions = adminPermissions.filter(
            adminPermission => adminPermission._id !== removeAdminPermission._id
          );

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
        {(removeAdminPermission, { loading, error }) => (
          <RemoveAdminBase
            action={variables => removeAdminPermission({ variables })}
            loading={loading}
            errors={(error) ? error.graphQLErrors: error}
            {...this.props}
          />
        )}
      </Mutation>
    );
  }
}

export default RemoveAdmin;
import React from 'react';
import { Mutation } from 'react-apollo';

import Auth from '../../../utils/auth';

import { OWN_ADMIN_PERMISSIONS } from '../../queries';
import { DELETE_SERVER } from '../../mutations';

import { DeleteServer as DeleteServerBase } from '../../../components';

class RemoveAdmin extends React.Component{
  render(){
    return (
      <Mutation
        mutation={DELETE_SERVER}
        update={(cache, { data: { deleteServer }}) => {
          let { adminPermissions } = cache.readQuery({
            query: OWN_ADMIN_PERMISSIONS,
            variables: {
              steamID: Auth.claim.steamID
            }
          });

          let newAdminPermissions = [];
          for(let adminPermission of adminPermissions){
            if(adminPermission.server._id === deleteServer._id) continue;
            newAdminPermissions.push(adminPermission);
          }

          cache.writeQuery({
            query: OWN_ADMIN_PERMISSIONS,
            variables: {
              steamID: Auth.claim.steamID
            },
            data: { adminPermissions: newAdminPermissions },
          });
        }}
        onError={() => {}}
      >
        {(deleteServer, { loading, error, data }) => (
          <DeleteServerBase
            server={(data) ? data.deleteServer : null}
            action={variables => deleteServer({ variables })}
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
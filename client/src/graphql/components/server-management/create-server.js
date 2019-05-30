import React from 'react';
import { Mutation } from 'react-apollo';

import Auth from '../../../utils/auth';

import { OWN_ADMIN_PERMISSIONS } from '../../queries';
import { CREATE_SERVER } from '../../mutations';

import { CreateServer as CreateServerBase } from '../../../components';

class CreateServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={CREATE_SERVER}
        update={(cache, { data: { createServer }}) => {
          let adminPermission = {
            ...createServer.adminPermission,
            server: createServer
          };
          delete adminPermission.server.adminPermission;

          let { adminPermissions } = cache.readQuery({
            query: OWN_ADMIN_PERMISSIONS,
            variables: {
              steamID: Auth.claim.steamID
            }
          });

          adminPermissions = adminPermissions.concat([adminPermission]);

          cache.writeQuery({
            query: OWN_ADMIN_PERMISSIONS,
            variables: {
              steamID: Auth.claim.steamID
            },
            data: { adminPermissions: adminPermissions },
          });
        }}
        onError={() => {}}
      >
        {(createServer, { data, loading, error }) => (
          <CreateServerBase
            action={variables => {
              variables.steamID = Auth.claim.steamID;
              createServer({ variables })
            }}
            server={(data) ? data.createServer : undefined}
            loading={loading}
            errors={(error) ? error.graphQLErrors: error}
            {...this.props}
          />
        )}
      </Mutation>
    );
  }
}

export default CreateServer;
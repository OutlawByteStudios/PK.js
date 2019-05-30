import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import Auth from '../../../utils/auth';

import { OWN_ADMIN_PERMISSIONS } from '../../../graphql/queries';
import { CREATE_SERVER } from '../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class CreateServer extends React.Component {
  render() {
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
        {(createServer, { loading, error, data }) => {
          if (loading) return <Loader/>;

          if(data) return (
            <Redirect
              to={this.props.match.path.replace('/create-server', `/${data.createServer.id}`)}
            />
          );

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors}/>
              }
              <Component
                action={variables => {
                  createServer({
                    variables: {
                      ...variables,
                      steamID: Auth.claim.steamID
                    }
                  });
                }}
              />
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(CreateServer);
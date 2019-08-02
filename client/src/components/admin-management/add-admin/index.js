import React from 'react';
import { Mutation } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';

import { ADMIN_PERMISSIONS } from '../../../graphql/queries';
import { ADD_ADMIN_PERMISSION } from '../../../graphql/mutations';

import Loader from './loader';
import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class AddAdminPermission extends React.Component {
  render() {
    return (
      <Mutation
        mutation={ADD_ADMIN_PERMISSION}
        update={(cache, { data: { addAdminPermission }}) => {
          let { adminPermissions } = cache.readQuery({
            query: ADMIN_PERMISSIONS,
            variables: { serverID: this.props.serverID }
          });

          adminPermissions = adminPermissions.concat([addAdminPermission]);

          cache.writeQuery({
            query: ADMIN_PERMISSIONS,
            variables: { serverID: this.props.serverID },
            data: { adminPermissions },
          });
        }}
        onError={() => {}}
      >
        {(addAdminPermission, { loading, error, data }) => {
          if (loading) return <Loader/>;

          if(!error && data) return (
            <Redirect
              to={
                this.props.match.path
                  .replace('/:serverID', '/' + this.props.serverID)
                  .replace('/:steamID', '') +
                '/' + data.addAdminPermission.admin.steamID
              }
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
                  addAdminPermission({
                    variables: {
                      ...variables,
                      serverID: this.props.serverID
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

export default withRouter(AddAdminPermission);
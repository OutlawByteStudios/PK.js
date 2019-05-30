import React from 'react';
import { Mutation } from 'react-apollo';

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
        {(addAdminPermission, { loading, error }) => {
          if (loading) return <Loader/>;

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

export default AddAdminPermission;
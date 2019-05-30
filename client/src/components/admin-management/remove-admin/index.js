import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import Auth from '../../../utils/auth';

import { ADMIN_PERMISSIONS } from '../../../graphql/queries';
import { REMOVE_ADMIN_PERMISSION } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';

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
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="danger"
              size="sm"
              className={(Auth.claim.steamID === this.props.steamID) ? 'disabled' : null}
              onClick={() => {
                removeAdminPermission({
                  variables: {
                    serverID: this.props.serverID,
                    steamID: this.props.steamID
                  }
                })
              }}
            >
              {
                (loading) ?
                  (
                    <>
                      <i className="fas fa-circle-notch fa-spin" />{" "}
                      Loading...
                    </>
                  ) : (
                    <>Remove Admin</>
                  )
              }
            </Button>
          </>
        )}
      </Mutation>
    );
  }
}

export default RemoveAdmin;
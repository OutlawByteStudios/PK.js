import React from 'react';
import { Query, Mutation } from 'react-apollo';

import Auth from '../../../utils/auth';

import { EDIT_ADMIN_PERMISSION } from '../../queries';
import { UPDATE_ADMIN_PERMISSION } from '../../mutations';

import { EditAdminPermissions as EditAdminPermissionsBase } from '../../../components';
import { Card, CardBody } from "reactstrap";

class EditAdminPermissions extends React.Component{
  render(){
    return (
      <Query
        query={EDIT_ADMIN_PERMISSION}
        variables={{
          serverID: this.props.serverID,
          selectedAdminSteamID: this.props.steamID,
          currentAdminSteamID: Auth.claim.steamID
        }}
        onError={() => {}}
      >
        {({ data, loading, error}) => {

          if (loading) return (
            <Card>
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Loading...
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

          if (error) return (
            <Card>
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Error!
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

          if(!data.server.selectedAdmin) return (
            <Card>
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  User is not an admin!
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

          return (
            <Mutation
              mutation={UPDATE_ADMIN_PERMISSION}
              onError={() => {}}
            >
              {(updateAdminPermission, mutationInfo) => (
                <EditAdminPermissionsBase
                  serverID={this.props.serverID}
                  steamID={this.props.steamID}

                  fetchLoading={loading}
                  fetchErrors={(error) ? error.graphQLErrors: error}

                  updateLoading={mutationInfo.loading}
                  updateErrors={(mutationInfo.error) ? mutationInfo.error.graphQLErrors: mutationInfo.error}

                  selectedAdmin={(data.server) ? data.server.selectedAdmin : null}
                  currentAdmin={(data.server) ? data.server.currentAdmin : null}

                  updatePermissionFunction={variables => updateAdminPermission({ variables })}

                  {...this.props}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditAdminPermissions;


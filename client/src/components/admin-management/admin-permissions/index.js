import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Card, CardBody } from "reactstrap";

import Auth from '../../../utils/auth';

import GraphQLErrorModal from '../../utils/graphql-error-modal';

import AdminPermissions from './admin-permissions';

import { QUERY, MUTATION} from './graphql';

class EditAdminPermissions extends React.Component{
  render(){
    if(this.props.steamID ===  null) return null;

    const QUERY_VARIABLES = {
      serverID: this.props.serverID,
      selectedAdminSteamID: this.props.steamID,
      currentAdminSteamID: Auth.claim.steamID
    };

    return (
      <Query
        query={QUERY}
        variables={QUERY_VARIABLES}
        fetchPolicy='cache-and-network'
      >
        {({ loading, error, data }) => {
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
              mutation={MUTATION}
              update={(cache, { data: { updateAdminPermission } }) => {
                const data = cache.readQuery({ query: QUERY, variables: QUERY_VARIABLES });
                data.server.selectedAdmin = updateAdminPermission;
                cache.writeQuery({ query: QUERY, variables: QUERY_VARIABLES, data: data, });
              }}
            >

              {(updateAdminPermission, { loading, error }) => (
                <>
                  <AdminPermissions
                    serverID={this.props.serverID}
                    steamID={this.props.steamID}

                    selectedAdmin={data.server.selectedAdmin}
                    currentAdmin={data.server.currentAdmin}

                    updatePermissionFunction={(variables) => {
                      updateAdminPermission({ variables })
                    }}
                    updatePermissionLoading={loading}
                  />
                  <GraphQLErrorModal error={error} />
                </>
              )}

            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditAdminPermissions;


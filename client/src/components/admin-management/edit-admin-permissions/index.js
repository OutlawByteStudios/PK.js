import React from 'react';
import { Query } from 'react-apollo';

import {
  Card,
  CardBody
} from 'reactstrap';

import Auth from '../../../utils/auth';

import { EDIT_ADMIN_PERMISSION } from '../../../graphql/queries';

import Loader from './loader';
import Error from './error';
import Component from './component';

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
          if (loading) return <Loader />;
          if (error) return <Error />;

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
            <Component
              selectedAdmin={data.server.selectedAdmin}
              currentAdmin={data.server.currentAdmin}
              key={data.server.selectedAdmin.admin.steamID}

              serverID={this.props.serverID}
              steamID={this.props.steamID}
            />
          );
        }}
      </Query>
    );
  }
}

export default EditAdminPermissions;


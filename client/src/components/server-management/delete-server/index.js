import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { Button } from 'reactstrap';

import Auth from '../../../utils/auth';

import { OWN_ADMIN_PERMISSIONS } from '../../../graphql/queries';
import { DELETE_SERVER } from '../../../graphql/mutations';

import ErrorModal from '../../misc/modals/error-modal';
import Component from './component';

class DeleteServer extends React.Component{
  render(){
    return (
      <Mutation
        mutation={DELETE_SERVER}
        update={(cache, { data: { deleteServer }}) => {
          let { adminPermissions } = cache.readQuery({
            query: OWN_ADMIN_PERMISSIONS,
            variables: { steamID: Auth.claim.steamID }
          });

          adminPermissions = adminPermissions.filter(
            adminPermission => adminPermission.server._id !== deleteServer._id
          );

          cache.writeQuery({
            query: OWN_ADMIN_PERMISSIONS,
            variables: { steamID: Auth.claim.steamID },
            data: { adminPermissions },
          });
        }}
        onError={() => {}}
      >
        {(deleteServer, { loading, error, data }) => {
          
          if(loading) return (
            <Button
              color="danger"
            >
              <i className="fas fa-circle-notch fa-spin" />{" "}
              Loading...
            </Button>
          );

          if(!error && data) return (
            <Redirect
              to={this.props.match.path.split('/:serverID')[0]}
            />
          );

          return (
            <>
              {
                error &&
                <ErrorModal errors={error.graphQLErrors} />
              }
              <Component
                action={() => deleteServer({ variables: { serverID: this.props.serverID } })}
              />
            </>

          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(DeleteServer);
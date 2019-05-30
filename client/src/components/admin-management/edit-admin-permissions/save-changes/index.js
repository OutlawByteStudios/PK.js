import React from 'react';
import { Mutation } from 'react-apollo';

import {
  Button
} from 'reactstrap';

import { UPDATE_ADMIN_PERMISSION } from '../../../../graphql/mutations';

import ErrorModal from '../../../misc/modals/error-modal';

class RemoveAdmin extends React.Component{
  render(){
    return (
      <Mutation
        mutation={UPDATE_ADMIN_PERMISSION}
        onError={() => {}}
      >
        {(updateAdminPermissions, { loading, error }) => (
          <>
            {
              error &&
              <ErrorModal errors={error.graphQLErrors} />

            }
            <Button
              color="primary"
              size="sm"
              onClick={() => {
                updateAdminPermissions({
                  variables: {
                    serverID: this.props.serverID,
                    steamID: this.props.steamID,
                    ...this.props.adminPermissions
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
                    <>Save Changes</>
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
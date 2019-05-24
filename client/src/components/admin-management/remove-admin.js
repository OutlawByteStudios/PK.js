import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import {
  Button
} from "reactstrap";

import Auth from '../../utils/auth';

import GraphQLErrorModal from '../utils/graphql-error-modal';

const MUTATION = gql`
  mutation RemoveAdminPermission($serverID: Int!, $steamID: String!){
    removeAdminPermission(serverID: $serverID, steamID: $steamID) {
      admin {
        steamID
        displayName
        avatar
      }
    }
  }
`;

class RemoveAdmin extends React.Component {
  render(){
    return(
      <Mutation
        mutation={MUTATION}
        onError={this.props.onError || function(){}}
        { ...this.props }
      >
        {(removeAdminPermission, { loading, error }) => {
          return (
            <>
              <GraphQLErrorModal error={error} />
              <Button
                color="danger"
                size="sm"
                className={(Auth.claim.steamID === this.props.steamID) ? 'disabled' : null}
                onClick={() => {
                  if(Auth.claim.steamID === this.props.steamID) return;
                  removeAdminPermission({
                    variables: {
                      serverID: this.props.serverID,
                      steamID: this.props.steamID
                    }
                  });
                }}
              >
                {
                  (loading) ? (
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
          );
        }}
      </Mutation>
    );
  }
}

export default RemoveAdmin;
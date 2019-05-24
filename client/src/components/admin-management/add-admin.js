import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import GraphQLErrorModal from '../utils/graphql-error-modal';

const MUTATION = gql`
  mutation AddAdminPermission($serverID: Int!, $steamID: String!){
    addAdminPermission(serverID: $serverID, steamID: $steamID) {
      admin {
        steamID
        displayName
        avatar
      }
    }
  }
`;

class AddAdmin extends React.Component {
  constructor(){
    super();
    this.addAdminSteamIDInput = React.createRef();
  }

  render(){
    return(
      <Mutation
        mutation={MUTATION}
        onError={this.props.onError || function(){}}
        { ...this.props }
      >
        {(addAdminPermission, { loading, error }) => (
          <>
            <Form
              onSubmit={event => {
                event.preventDefault();
                addAdminPermission({
                  variables: {
                    serverID: this.props.serverID,
                    steamID: this.addAdminSteamIDInput.current.value
                  }
                });
                this.addAdminSteamIDInput.current.value = "";
              }}
            >
              <InputGroup>
                <Input
                  type="text"
                  bsSize="sm"
                  placeholder="Steam ID"
                  innerRef={this.addAdminSteamIDInput}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="primary"
                    size="sm"
                  >Add Admin</Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            { loading &&
            <div className="text-center mt-2">
              <i className="fas fa-circle-notch fa-spin" />{" "}
              Loading...
            </div>
            }
            <GraphQLErrorModal error={error} />
          </>
        )}
      </Mutation>
    );
  }
}

export default AddAdmin;
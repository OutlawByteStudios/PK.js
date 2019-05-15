import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import AdvancedModal from '../utils/advanced-modal';

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
            {
              error &&
              <AdvancedModal>
                {(modal) =>  (
                  <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={modal.isOpen}
                  >
                    <ModalHeader>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={modal.close}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <div className="py-3 text-center">
                        <i className="fas fa-exclamation-triangle fa-4x" />
                        <h4 className="heading mt-4">Error!</h4>
                        { console.log(error) }
                        {
                          error.graphQLErrors.map((error, key) => (
                            <p key={key}>{ error.message }</p>
                          ))
                        }
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        className="text-white ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={modal.close}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                )}
              </AdvancedModal>
            }
          </>
        )}
      </Mutation>
    );
  }
}

export default AddAdmin;
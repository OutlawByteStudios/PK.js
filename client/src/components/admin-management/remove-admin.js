import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import AdvancedModal from '../utils/advanced-modal';

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
              <Button
                color="danger"
                size="sm"
                onClick={() => {
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
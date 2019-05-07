import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Row,
  Table
} from 'reactstrap';

import AdvancedModal from '../../../misc/advanced-modal';

import query from './query';

import {
  ADD_ADMIN_PERMISSION,
  REMOVE_ADMIN_PERMISSION
} from './mutations';

class PlayerInfo extends React.Component {
  constructor(){
    super();
    this.addAdminSteamIDInput = React.createRef();
    this.editAdminRedirect = this.editAdminRedirect.bind(this);
  }

  editAdminRedirect(steamID){
    this.props.history.push(
      this.props.match.path
        .replace(':serverID', this.props.serverID)
        .replace('/:steamID', '')
      + ((steamID) ? '/' + steamID : '')
    );
  }

  render(){
    return(
      <Card>
        <CardHeader className="border-0">
          <h3 className="mb-0">Admins</h3>
        </CardHeader>

        <Query
          query={query}
          variables={{
            serverID: this.props.serverID
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return (
              <CardBody>
                <div className="text-center mt-2 mb-3">
                  Loading...
                </div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            );

            if (error) return (
              <CardBody>
                <Alert color="danger">
                  <i className="fas fa-exclamation-triangle" />{" "}
                  <strong>Error</strong> - Something went wrong.
                </Alert>
              </CardBody>
            );

            return (
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                  <th scope="col">Admin</th>
                  <th scope="col">GUID</th>
                  <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                  data.server.adminPermissions.map((adminPermission, key) => (
                    <tr key={key}>
                      <td>
                        <NavLink
                          href={"/admin/profile/" + adminPermission.admin.steamID}
                          target="_blank"
                        >
                          <Media className="align-items-center">
                            <span className="avatar avatar-sm rounded-circle">
                              <img
                                alt="..."
                                src={adminPermission.admin.avatar}
                              />
                            </span>
                            <Media className="ml-2">
                              <span className="mb-0 text-sm font-weight-bold">
                                {adminPermission.admin.displayName}
                              </span>
                            </Media>
                          </Media>
                        </NavLink>
                      </td>
                      <td>{(adminPermission.player) ? adminPermission.player.guid : 'GUID not set.'}</td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => { this.editAdminRedirect(adminPermission.admin.steamID); }}
                        >
                          Edit Permission
                        </Button>
                        <Mutation
                          mutation={REMOVE_ADMIN_PERMISSION}
                          refetchQueries={[{
                            query,
                            variables: {
                              serverID: this.props.serverID
                            }
                          }]}
                          onCompleted={() => {
                            this.editAdminRedirect();
                          }}
                          onError={() => {}}
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
                                        steamID: adminPermission.admin.steamID
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
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </Table>
            );
          }}
        </Query>

        <CardBody className="text-center">
          <Row className="justify-content-center">
            <Col lg="6">
              <Mutation
                mutation={ADD_ADMIN_PERMISSION}
                refetchQueries={[{
                  query,
                  variables: {
                    serverID: this.props.serverID
                  }
                }]}
                onCompleted={(data) => {
                  this.editAdminRedirect(
                    data.addAdminPermission.admin.steamID
                  );
                }}
                onError={() => {}}
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
                    <Modal
                      className="modal-dialog-centered modal-danger"
                      contentClassName="bg-gradient-danger"
                    >
                      {(closeModal) =>  (
                        <>
                          <div className="modal-header">
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={closeModal}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="py-3 text-center">
                              <i className="fas fa-exclamation-triangle fa-4x" />
                              <h4 className="heading mt-4">Error!</h4>
                              {
                                error.graphQLErrors.map((error, key) => (
                                  <p key={key}>{ error.message }</p>
                                ))
                              }
                            </div>
                          </div>
                          <div className="modal-footer">
                            <Button
                              className="text-white ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={closeModal}
                            >
                              Close
                            </Button>
                          </div>
                        </>
                      )}
                    </Modal>
                  }
                </>
                )}
              </Mutation>
            </Col>
          </Row>
        </CardBody>

      </Card>
    );
  }
}

export default withRouter(PlayerInfo);
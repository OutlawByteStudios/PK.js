import React from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input, Modal, ModalBody, ModalFooter, ModalHeader,
  Row
} from "reactstrap";

import { QUERY as SERVER_SELECTOR_QUERY } from './server-selector/select';

import AdvancedModal from "./utils/advanced-modal";
import Auth from "../utils/auth";

const MUTATION = gql`
  mutation CreateServer($name: String!, $welcomeMessage: String){
    createServer(name: $name, welcomeMessage: $welcomeMessage){
      id
    }
  }
`;


class CreateServer extends React.Component {
  constructor(){
    super();
    this.serverName = React.createRef();
    this.welcomeMessage = React.createRef();
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION}
        onCompleted={(data) => {
          this.props.history.push(
            this.props.match.path.replace('/new-server', '/' + data.createServer.id)
          );
        }}
        refetchQueries={[
          {
            query: SERVER_SELECTOR_QUERY,
            variables: {
              steamID: Auth.claim.steamID
            }
          }
        ]}
        onError={function(){}}
      >
        {(createServer, { loading, error }) => (
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Create Server</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form
                onSubmit={event => {
                  event.preventDefault();
                  createServer({
                    variables: {
                      name: this.serverName.current.value,
                      welcomeMessage: this.welcomeMessage.current.value
                    }
                  });
                  this.serverName.current.value = "";
                  this.welcomeMessage.current.value = "";
                }}
              >
                <Row>
                  <Col>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Server Name
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Server Name"
                        type="text"
                        innerRef={this.serverName}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Welcome Message
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Welcome Message"
                        type="text"
                        innerRef={this.welcomeMessage}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Button
                      color="primary"
                    >
                      Create
                    </Button>
                  </Col>
                </Row>
                {
                  loading &&
                  <Row>
                    <Col className="text-center">
                      <i className="fas fa-circle-notch fa-spin" /> Loading...
                    </Col>
                  </Row>
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
              </Form>
            </CardBody>
          </Card>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateServer);

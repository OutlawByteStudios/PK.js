import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";

import ErrorModal from '../utils/error-modal';


class CreateServer extends React.Component{

  constructor(){
    super();

    this.serverName = React.createRef();
    this.welcomeMessage = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    this.props.action({
      name: this.serverName.current.value,
      welcomeMessage: this.welcomeMessage.current.value
    });

    this.serverName.current.value = "";
    this.welcomeMessage.current.value = "";
  }

  render(){
    if(this.props.server) return(
      <Redirect
        to={this.props.match.path.replace('/create-server', '/' + this.props.server.id)}
      />
    );

    if(this.props.loading) return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Create Server</h3>
            </Col>
          </Row>
        </CardHeader>
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
    
    if(this.props.errors) return (
      <ErrorModal errors={this.props.errors} />
    );

    return (
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
            onSubmit={this.onSubmit}
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
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(CreateServer);
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { validatorServerName } from 'shared/validators';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Row
} from "reactstrap";

import ErrorModal from '../utils/error-modal';


class CreateServer extends React.Component{
  state = {
    serverName: {
      validator: validatorServerName,
      valid: false
    },
    welcomeMessage: {
      valid: true
    }
  };

  constructor(){
    super();

    for(let field in this.state) {
      this.state[field] = {
        ref: React.createRef(),
        ...this.state[field]
      };
    }

    this.updateField = this.updateField.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  updateField(field){
    this.setState({
      [field]: {
        ...this.state[field],
        valid:
          (this.state[field].validator) ?
            this.state[field].validator(this.state[field].ref.current.value) :
            true
      }
    });
  }

  isValid(){
    for(let field in this.state){
      if(!this.state[field].valid) return false;
    }
    return true;
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
          <div className="text-center mt-3 mb-3">
            This may take a few minutes.
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
                <label
                  className="form-control-label"
                  htmlFor="input-first-name"
                >
                  Server Name
                </label>
                <FormGroup
                  className={(this.state.serverName.valid) ? null : 'has-danger'}
                >
                  <Input
                    className="form-control-alternative"
                    placeholder="Server Name"
                    type="text"
                    innerRef={this.state.serverName.ref}
                    invalid={!this.state.serverName.valid}
                    onChange={() => { this.updateField('serverName') }}
                  />
                  <FormFeedback
                    valid={this.state.serverName.valid}
                  >
                    A server name cannot be blank and must only contain the characters A-Z, a-z, 0-9 or _
                  </FormFeedback>
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
                    innerRef={this.state.welcomeMessage.ref}
                    invalid={!this.state.welcomeMessage.valid}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button
                  color="primary"
                  disabled={!this.isValid()}
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
import React from 'react';

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
} from 'reactstrap';

import { validatorServerName } from 'shared/validators';

class Component extends React.Component{
  state = {
    name: '',
    welcomeMessage: 'Welcome to a PK.js powered server!'
  };
  
  constructor(){
    super();
    
    this.isValid = this.isValid.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }
  
  isValid(){
    return validatorServerName(this.state.serverName);
  }

  onSubmit(event) {
    event.preventDefault();

    if(!this.isValid()) return;

    this.props.action(this.state);
  }

  render(){
    return (
      <Card>
        <CardHeader>
          <h3 className="mb-0">Create Server</h3>
        </CardHeader>
        <CardBody
          className="bg-secondary shadow"
        >
          <Form
            onSubmit={this.onSubmit}
          >
            <Row>
              <Col>
                <label
                  className="form-control-label"
                >
                  Server Name
                </label>
                <FormGroup>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                    invalid={!validatorServerName(this.state.name)}
                  />
                  <FormFeedback>
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
                    type="text"
                    value={this.state.welcomeMessage}
                    onChange={event => this.setState({ welcomeMessage: event.target.value })}
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

export default Component;
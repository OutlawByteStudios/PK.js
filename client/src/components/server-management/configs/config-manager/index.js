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
} from "reactstrap";

import { validatorServerConfigName } from 'shared/validators';

import ConfigSelector from '../config-selector';
import ConfigEditor from '../config-editor';

class ConfigManager extends React.Component{
  state = {
    config: null,
    newConfigName: ''
  };

  constructor(){
    super();
    this.onNewConfig = this.onNewConfig.bind(this);
  }

  onNewConfig(event){
    event.preventDefault();

    if(!validatorServerConfigName(this.state.newConfigName)) return;

    this.setState({ config: this.state.newConfigName });
  }
  
  render(){
    return (
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Config File Management</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col>
              <ConfigSelector
                serverID={this.props.serverID}
                selectedConfig={this.state.config}
                onChange={value => this.setState({ config: value })}
                newConfig={true}
              />
            </Col>
          </Row>
          {
            this.state.config &&
            this.state.config === 'new' &&
            <Form
              onSubmit={this.onNewConfig}
            >
              <Row className="align-items-center mt-2">
                <Col>
                  <label
                    className="form-control-label"
                  >
                    Config Name
                  </label>
                  <FormGroup>
                    <Input
                      className="form-control-alternative"
                      type="text"
                      value={this.state.newConfigName}
                      onChange={event => this.setState({ newConfigName: event.target.value })}
                      invalid={!validatorServerConfigName(this.state.newConfigName)}
                    />
                    <FormFeedback>
                      A config name cannot be blank and must only contain the characters A-Z, a-z, 0-9 or _.
                      It must end with <code>.txt</code>.
                    </FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button
                    color="primary"
                    disabled={!validatorServerConfigName(this.state.newConfigName)}
                  >
                    Create
                  </Button>
                </Col>
              </Row>
            </Form>

          }
          {
            this.state.config &&
            this.state.config !== 'new' &&
            <>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">
                Config File
              </h6>
              <ConfigEditor
                serverID={this.props.serverID}
                config={this.state.config}
              />
            </>
          }
        </CardBody>
      </Card>
    );
  }
}

export default ConfigManager;
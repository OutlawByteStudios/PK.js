import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';

import ConfigSelector from '../config-selector';
import ConfigEditor from '../config-editor';

class ConfigManager extends React.Component{
  state = {
    config: null  
  };
  
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
          <ConfigSelector
            serverID={this.props.serverID}
            selectedConfig={this.state.config}
            onChange={value => this.setState({ config: value })}
          />
          {
            this.state.config &&
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